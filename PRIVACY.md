# Privacidad — Kaia-Pay (demo por invitación)

Este texto es un aviso provisional para la demo cerrada. Sustitúyalo por la política definitiva antes de abrir el servicio más allá de la lista de comercios invitados. No es asesoría legal.

## Responsable

**KAIA-Bolivia SRL** (Bolivia, [kaialatam.com](https://kaialatam.com/)) opera Kaia-Pay. Política completa: [pay.kaialatam.com/privacidad.html](https://pay.kaialatam.com/privacidad.html).

## Qué es este repositorio

`kaia-pay-mcp` empaqueta el plugin de Claude (skills, comandos y la vista MCP App). No guarda comercios, pagos ni credenciales. El servidor de pagos vive en [carlos-olivera/kaia-pay](https://github.com/carlos-olivera/kaia-pay) y atiende `https://mcp.kaia-pay.pay-bo.com/mcp`.

## Qué datos circulan al usar el plugin

Al conectar el conector, Claude habla con ese servidor por HTTPS. El comercio entra con OAuth (Auth0) y los scopes `kp:read` y `kp:charge`. El servidor identifica al comercio con el token de acceso. Este paquete no incluye claves de API, secretos de Auth0 ni datos de comercios.

En un cobro, el conector envía el monto en bolivianos y la glosa que el comercio dictó, y recibe de vuelta el estado del cobro, la referencia y el QR que generó el servidor. Consultas de ventas y de QR vencidos leen totales y cobros de esa misma cuenta. El pagador confirma el pago en su app bancaria, fuera de Claude. Si el servidor devuelve datos del pagador, llegan enmascarados según la respuesta de la herramienta.

## Qué no hace el plugin

El plugin no pide una cuenta de destino ni una cuenta de liquidación: eso no es un parámetro de las herramientas. No ofrece reembolsos por OAuth. No incorpora un catálogo de SKU ni un carrito.

## Conservación

La retención de cobros, registros y tokens la define el servicio Kaia-Pay de la demo. Este repositorio no opera esa base. Hasta publicar la política definitiva, trate la demo como un entorno de prueba con comercios invitados y no cargue datos que no quiera usar en una prueba.

## Contacto

KAIA-Bolivia SRL · [privacidad](https://pay.kaialatam.com/privacidad.html) · issues: https://github.com/carlos-olivera/kaia-pay-mcp/issues
