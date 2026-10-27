# Resultado de cobro QR

Sincronizado con `carlos-olivera/kaia-pay` en `aed901d171dda8dd58476d7f6f1022057042079a`. Si el servidor cambia los campos, actualice este archivo y la vista `ui/qr-charge.html`.

La herramienta responde con `content` (texto JSON y, si el QR se puede pagar, un bloque `image` PNG) y `structuredContent: { ok, data }` o `{ ok: false, error: { code, message } }`. El base64 del PNG no va dentro del JSON de `get_qr_image`; va en el bloque `image`.

## create_qr_charge

Entrada mínima: `amount` (número, Bs) y `description` o `glosa`.

Campos de `data` que el agente puede leer:

- `chargeId`, `reference` (KPY-…)
- `status`, `amount`, `amountCents`, `currency`, `description`
- `expiresAt`
- `qrPayable`, `qr_image_url`, `qr_page_url`, `qr_link_expires_at`
- `qr.imagePngBase64` cuando la herramienta incluye la imagen en el JSON
- `autoReplay` si devolvió el mismo QR de la ventana de dos minutos
- `serverDate.today`, `serverDate.timezone`

## get_qr_image

Entrada: `chargeId` o `reference`, exactamente uno. Cada llamada emite enlaces nuevos; los anteriores siguen vigentes hasta que vence el QR.

`data`: `chargeId`, `reference`, `status`, `qrState` (`payable`, `paid`, `expired`, `cancelled`, `unavailable`), `amount`, `amountCents`, `currency`, `description`, `expiresAt`, `qrPayable`, `qr_image_url`, `qr_page_url`, `qr_link_expires_at`, `message`.

## get_payment_status

Entrada: `chargeId` o `reference`, exactamente uno. Solo lectura.

`data`: `status`, `paid` (booleano), `paidAt`, `amount`, `amountCents`, `currency`, `detectedBy`, `webhookReceived`. No trae un QR nuevo. No fabrique una imagen a partir de esta respuesta.

## Qué no usar

No arme un payload EMV, no recorte el token de `qr_image_url` y no convierta `amountCents` en otro monto para el cliente si `amount` ya vino en la respuesta. La cuenta de liquidación no aparece en estas herramientas.
