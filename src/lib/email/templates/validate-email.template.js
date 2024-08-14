function templateHtml(magicLink) {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rammetto+One&family=Libre+Baskerville:wght@700&display=swap" rel="stylesheet">
  </head>
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">¡Bienvenido a Randomlandia!</div>

  <body style="background-color:#ffffff;font-family:'Rammetto One', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:560px;margin:0 auto;padding:20px 0 48px">
      <tbody>
        <tr style="width:100%; text-align:center;">
          <td>
            <img alt="Linear" height="300" src="https://i.ibb.co/GCB4Hjz/Imagen-de-Whats-App-2024-08-10-a-las-15-16-46-a1823ef3.jpg" style="display:block;margin: 0 auto; outline:none;border:none;text-decoration:none;border-radius:21px;width:300px;height:auto" />
            <h1 style="font-size:22px;letter-spacing:-0.5px;line-height:1.3;font-weight:700;font-family:'Libre Baskerville', serif;color:#1aaf19;padding:17px 0 0">¡Bienvenido a Randomlandia!</h1>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:27px 0 27px">
              <tbody>
                <tr>
                  <td>
                    <a href="${magicLink}" style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#ff9d30;border-radius:50px;font-weight:600;color:#fff;font-size:15px;text-align:center;padding:11px 23px;font-family:'Rammetto One', cursive;" target="_blank">
                      Clickeame para validar tu cuenta
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149;font-family:'Rammetto One', cursive;">
              Este mensaje se autodestruirá en 5 minutos... ¡Únete a la aventura!
            </p>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" />
            <a href="https://randomlandia.com" style="color:#b4becc;text-decoration:none;font-size:14px;font-family:'Rammetto One', cursive;" target="_blank">
              Randomlandia
            </a>
          </td>
        </tr>
        <tr style="width:100%; text-align:center;">
          <td>
            <p style="font-size:15px;line-height:1.4;margin:40px 0 15px;color:#3c4149;font-family:'Rammetto One', cursive;">
              Muy atentamente,
            </p>
            <img src="https://media.tenor.com/GLZZKZJyJAEAAAAd/dance-dancing-duck.gif" alt="Dancing Duck" style="display:block;margin: 0 auto;outline:none;border:none;text-decoration:none;width:150px;height:auto;" />

          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>
    `;
}
module.exports = templateHtml;
