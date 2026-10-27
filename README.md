# Kaia-Pay

Cobros QR para agentes de IA, en bolivianos, para un comercio de Bolivia. El comercio dice el monto y la glosa; el servidor que ya está en producción emite el QR; la persona que paga lo confirma al escanearlo en su banca. Esta demo es solo por invitación.

Este repositorio es el paquete del plugin para el directorio de Claude: manifiesto, skills, comandos, la vista MCP App y el apuntador al MCP remoto. El servidor de pagos vive en [carlos-olivera/kaia-pay](https://github.com/carlos-olivera/kaia-pay). Aquí no se reimplementa el cobro.

Agentic QR payments for invited merchants in Bolivia. The amount is a free point-of-sale parameter. The same remote MCP serves a custom connector and, later, the directory listing. Listing owner: Carlos Olivera Terrazas.

## Dos formas de instalarlo

Las dos hablan con `https://mcp.kaia-pay.pay-bo.com/mcp`. Conectar las dos a la vez no crea otro servidor: es el mismo URL.

### Conector personalizado (pruebas)

En Claude, agregue un conector por URL:

```text
https://mcp.kaia-pay.pay-bo.com/mcp
```

El acceso es OAuth con Auth0. Los scopes que publica el recurso son `kp:read` y `kp:charge`. El comercio tiene que estar en la lista de invitación y completar `/connect` en el servicio. Los metadatos públicos del recurso están en `https://mcp.kaia-pay.pay-bo.com/.well-known/oauth-protected-resource`. No pegue claves en el chat ni en este repositorio.

Este camino sigue válido cuando el plugin entre al directorio.

### Plugin del directorio (cuando se publique)

El paquete está en la raíz de este repositorio (`.claude-plugin/plugin.json`, skills y `.mcp.json`). En Claude: Customize → Plugins → instalar Kaia-Pay. En la pestaña Connectors del plugin, conecte el servidor remoto e inicie sesión con la cuenta del comercio. Las skills quedan disponibles como `/kaia-pay:cobrar`, `/kaia-pay:reenviar-qr`, `/kaia-pay:ventas-hoy` y `/kaia-pay:qr-vencidos`.

Para una prueba local con Claude Code, desde la carpeta padre: `claude --plugin-dir ./kaia-pay-mcp`.

## Qué hace el comercio

- **Cobrar.** Monto en Bs y concepto. `create_qr_charge` emite el QR. `amount` es libre: Tesabiz spec v5.7 lo exige como `importe` dentro de `encript64`. Luego `get_payment_status` (y, si el comercio dice que ya le pagaron, una llamada a `refresh_charge_status`).
- **Reenviar QR.** `get_qr_image` con `chargeId` o `reference`. Los enlaces salen de esa respuesta.
- **Ventas hoy / resumen.** `get_daily_digest` y, si preguntan cuánto vendieron, `cash_close`.
- **QR vencidos.** `expiredUnpaid` del digest, o `list_transactions` con `status` `expired`. Un QR vencido no se reabre.

La imagen PNG, `qr_image_url` y `qr_page_url` se copian de `create_qr_charge` o `get_qr_image`. El agente no inventa ni reescribe URLs ni base64.

En v1 no hay carrito ni herramientas de SKU. Un catálogo futuro sería otra herramienta, en el servidor Kaia, que resuelva el precio en la base de Kaia y recién entonces llame a `encript64` con `importe`. Los campos opcionales de Tesabiz `codProducto` y `catProducto` no forman parte de este plugin.

## Vista MCP App

`ui/qr-charge.html` es la vista autocontenida (sin CDN) para el iframe. Muestra el monto y la glosa exactos de `structuredContent` y deja el QR oculto hasta el botón **Mostrar QR al cliente**. También pinta pagado o pendiente. Si el host no dibuja UI, las herramientas siguen sirviendo por su texto y su bloque de imagen.

Para que Claude la renderice, el servidor de `kaia-pay` tiene que publicarla como `ui://kaia-pay/qr-charge`. Ese registro todavía no está en este repositorio. El detalle está en `ui/README.md`.

Abrir `ui/qr-charge.html` en el navegador muestra una vista previa local, con un dibujo que no es un QR de pago.

## Security model

- `merchant_id` sale del JWT de OAuth en el servidor. Las herramientas no reciben ese id como parámetro.
- La cuenta de liquidación queda fijada en el servidor para ese comercio. Ningún parámetro de herramienta elige una cuenta de destino.
- Quien paga confirma fuera de banda, al escanear el QR en su app bancaria.
- El monto del POS es libre. Los topes por cobro y por ventana los aplica el servidor del comercio.
- El conector personalizado y el plugin del directorio usan el mismo servidor: `https://mcp.kaia-pay.pay-bo.com/mcp`.
- La MCP App exige una confirmación explícita del monto y la glosa devueltos por la herramienta antes de tratar el QR como listo para el cliente.
- OAuth expone `kp:read` y `kp:charge`. No hay herramientas de reembolso en ese camino.
- v1 no agrega `cart_id` ni un catálogo de SKU. El importe de `encript64` sigue siendo `amount`.

## Datos

El plugin no guarda comercios ni pagos. Claude envía monto, glosa e identificadores de cobro al MCP de Kaia-Pay, y recibe estado, totales y el QR que generó el servidor. Auth0 autentica al comercio. Este paquete no contiene claves de API, secretos de Auth0 ni datos de comercios. Avisos provisionales: `PRIVACY.md` y `TERMS.md`.

## Qué queda fuera

El código del servidor, Tesabiz y la liquidación están en `carlos-olivera/kaia-pay`. Si un nombre de herramienta de este paquete deja de coincidir con producción, márquelo `TODO-sync-with-server` y ajústelo contra el MCP en vivo. Los nombres de v1 usados aquí son `create_qr_charge`, `get_qr_image`, `get_payment_status`, `refresh_charge_status`, `get_daily_digest`, `cash_close` y `list_transactions`.
