---
description: Listar QR vencidos sin pagar
---

Sigue la skill qr-vencidos de este plugin.

Lee `expiredUnpaid` de `get_daily_digest` o `list_transactions` con `status` `expired`. No uses `list_pending_qrs` para esta pregunta. No reconstruyas el QR vencido. Un cobro nuevo solo si el comercio lo pide, con `create_qr_charge`.
