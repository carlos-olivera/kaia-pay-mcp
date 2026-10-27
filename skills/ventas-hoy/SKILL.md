---
name: ventas-hoy
description: >
  Resume las ventas del comercio en Bolivia: hoy, ayer o el cierre del día.
  Úsela para "¿cuánto vendí hoy?", "ventas de hoy", "resumen del día" o cierre de caja.
  Today's sales summary for a Kaia-Pay merchant. Read totals from tools only.
---

# Ventas hoy

## Reglas

1. Los totales salen de las herramientas. No calcule de memoria ni rellene cifras que la respuesta no traiga. Lea `summary` y, si hace falta el desglose, los objetos de la misma respuesta.
2. No pida `merchant_id`: el servidor lo toma del JWT de OAuth. No pida cuenta de liquidación ni ofrezca reembolsos; OAuth no tiene esas herramientas.
3. Fechas en la zona del comercio (por defecto America/La_Paz). Si duda del día, llame a `get_server_date`.
4. Esto no es un carrito ni un catálogo. No invente SKU.
5. Si el comercio quiere el QR de uno de esos cobros, no arme el enlace: use la skill reenviar QR (`get_qr_image`).

## Pasos

1. Para "¿cómo va el día?" o "resumen", llame a `get_daily_digest` con `date` en `hoy` (defecto), `ayer` o `YYYY-MM-DD`. Responda con `summary`. Mencione `alerts` si vienen.
2. Para "¿cuánto vendí hoy?" puede bastar el `cashClose` dentro del digest, o llame a `cash_close` con `date`: `hoy`, `ayer` o `YYYY-MM-DD`. Use `gross`, `commission` y `net` como montos cobrados, y `count` / `amount` como QR emitidos ese día. La comisión es la que devuelve la herramienta.
3. Para "esta semana" o "el mes", llame a `transactions_summary` con `period` (`esta_semana`, `semana_pasada`, `este_mes`, `mes_pasado`, `ultimos_7_dias`, `ultimos_30_dias`) o `from` y `to`.
4. Diga las cifras en bolivianos, en una frase corta, y ofrezca el detalle solo si lo piden.
