# Vista MCP App — QR de cobro

Archivo único: `qr-charge.html`.

El host (Claude) lo carga en un iframe aislado cuando el servidor MCP publica este HTML como recurso `ui://`. Este repositorio no ejecuta el servidor de pagos. El servidor de producción sigue en [carlos-olivera/kaia-pay](https://github.com/carlos-olivera/kaia-pay), URL `https://mcp.kaia-pay.pay-bo.com/mcp`.

## Contrato que la vista espera

La vista lee el resultado de `create_qr_charge` o `get_qr_image`:

- Monto, moneda y glosa: `structuredContent.data.amount`, `.currency`, `.description`.
- Estado: `.status`, `.paid`, `.qrState`, `.qrPayable`.
- Imagen: el bloque `content[]` con `type: "image"` y `mimeType: "image/png"`, o `data.qr.imagePngBase64`. Solo se dibuja si el base64 es un PNG (`iVBORw0KGgo`).
- Enlaces: `qr_image_url` y `qr_page_url` se muestran tal cual, y solo si empiezan por `https://`. La vista no los reescribe ni los arma.

Hasta que el comercio pulsa **Mostrar QR al cliente**, el QR permanece oculto. Esa pulsación es la confirmación de “ya se puede mostrar al cliente”. Las herramientas siguen respondiendo con texto e imagen para un host sin UI.

`get_payment_status` (botón Actualizar estado, y un sondeo corto después de confirmar) solo cambia la insignia de estado. No crea otro cobro.

## Qué tiene que registrar el servidor

TODO-sync-with-server. En `carlos-olivera/kaia-pay`, publicar este archivo como recurso MCP App y enlazarlo a las herramientas de QR. Borrador:

- URI: `ui://kaia-pay/qr-charge`
- MIME: `text/html;profile=mcp-app`
- Herramientas: `create_qr_charge` y `get_qr_image`, con `_meta.ui.resourceUri` apuntando a esa URI
- `ui.domain` para Claude, hash del URL del servidor: `88ed1d77376931a3813d0153d8dd6ba4.claudemcpcontent.com`
- CSP: la vista no carga scripts ni imágenes de otra red. No hace falta `resourceDomains` si el HTML se sirve inline. La imagen del QR va en `data:`.

Sin ese registro, Claude sigue usando las herramientas en texto. El plugin no reimplementa `encript64` ni el cobro.

## Probar la vista sola

Abra `qr-charge.html` en el navegador (nivel superior, sin iframe). Carga un cobro de prueba, no un QR de pago. El botón de confirmar revela la imagen; **Simular pago** cambia la insignia a Pagado.
