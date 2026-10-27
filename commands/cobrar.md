---
description: Cobrar un monto en Bs y mostrar el QR solo desde la herramienta
---

Sigue la skill cobrar de este plugin.

Pide monto y glosa si faltan. Llama a `create_qr_charge` con esos datos. Muestra la imagen y los enlaces únicamente como los devolvió la herramienta (`qr_image_url`, `qr_page_url`, bloque image). Antes de decir que el cliente ya puede ver el QR, confirma con el comercio el monto y la glosa de la respuesta. Consulta `get_payment_status` y, si insisten en que ya pagaron, `refresh_charge_status` una vez.

No inventes URLs ni base64. No pidas cuenta de destino ni reembolso.
