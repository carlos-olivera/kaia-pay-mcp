# Términos — Kaia-Pay (demo por invitación)

Texto provisional para la demo cerrada. No es una oferta pública ni un contrato definitivo. Sustitúyalo antes de admitir comercios fuera de la lista de invitación.

## Quién opera

Kaia-Pay es operado por **KAIA-Bolivia SRL**, sociedad de responsabilidad limitada fundada en Bolivia ([kaialatam.com](https://kaialatam.com/)).

## Alcance

Kaia-Pay permite a un comercio invitado cobrar con QR en bolivianos desde un agente (punto de venta agéntico, Bolivia). El monto lo indica el comercio en el momento del cobro. El servidor aplica los límites de ese comercio. El pagador acepta el pago al escanear el QR en su banca. La cuenta de liquidación está fijada en el servidor para ese comercio; el chat no la elige.

La demo es solo por invitación (lista de acceso y flujo `/connect`). Un conector personalizado a `https://mcp.kaia-pay.pay-bo.com/mcp` y el plugin del directorio usan ese mismo servidor.

## Uso del QR

El QR y sus enlaces los emite el servidor (`create_qr_charge`, `get_qr_image`). Quien tenga el QR o el enlace puede pagar mientras siga vigente. El comercio confirma el monto y la glosa antes de mostrarlo al cliente. Este conector OAuth no incluye herramientas de reembolso ni de cambio de cuenta.

## Responsabilidad de la demo

Los límites, la disponibilidad y el tratamiento de un pago no conciliado los define el servidor de la demo. Este repositorio solo distribuye instrucciones para el agente y la vista que muestra el resultado de esas herramientas. No envíe secretos, llaves ni datos de terceros que no correspondan a la prueba.

## Contacto

KAIA-Bolivia SRL · [Términos en pay.kaialatam.com](https://pay.kaialatam.com/terminos.html) · issues: https://github.com/carlos-olivera/kaia-pay-mcp/issues
