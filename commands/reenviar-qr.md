---
description: Reenviar el QR de un cobro existente
---

Sigue la skill reenviar-qr de este plugin.

Llama a `get_qr_image` con `chargeId` o `reference` (uno solo). Copia imagen y enlaces de la respuesta. Confirma monto y glosa antes de tratarlo como QR para el cliente. Si `qrPayable` es falso, di el `message` de la herramienta y no fabriques un enlace.
