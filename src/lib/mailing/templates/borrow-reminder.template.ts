import { Book } from "@/lib/models/book.model";
import { Borrow } from "@/lib/models/borrow.model";
import dayjs from "dayjs";

export const BorrowReminderTemplate = (
  account: Account,
  borrows: Borrow[]
) => `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Email Confirmation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        /**
     * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
     */
        @media screen {
            @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }

            @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
        }

        body,
        table,
        td,
        a {
            -ms-text-size-adjust: 100%;
            /* 1 */
            -webkit-text-size-adjust: 100%;
            /* 2 */
        }

        table,
        td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
        }

        /**
     * Fix centering issues in Android 4.4.
     */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }

        body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        /**
     * Collapse table borders to avoid space between cells.
     */
        table {
            border-collapse: collapse !important;
        }

        a {
            color: #1a82e2;
        }

        img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
        }
    </style>

</head>

<body style="background-color: #e9ecef;">

    <!-- start preheader -->
    <div class="preheader"
        style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        Thông báo sách quá hẹn
    </div>
    <!-- end preheader -->

    <!-- start body -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">

        <!-- start logo -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
          <td align="center" valign="top" width="600">
      <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 36px 24px;">
                            <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                                <img src="https://i.imgur.com/WANVMWG.png" alt="Logo" border="0" height="48"
                                    style="display: block; height: 50px;">
                            </a>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
      </td>
      </tr>
      </table>
      <![endif]-->
            </td>
        </tr>
        <!-- end logo -->

        <!-- start hero -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
          <td align="center" valign="top" width="600">
      <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                            <h1
                                style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                                Thông báo sách quá hẹn
                            </h1>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
      </td>
      </tr>
      </table>
      <![endif]-->
            </td>
        </tr>
        <!-- end hero -->

        <!-- start copy block -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
          <td align="center" valign="top" width="600">
      <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">
                                Xin chào ${account.fullName},<br /><br />
                                D-Free Book hy vọng bạn đang có một ngày tốt lành. <br /><br />
                                D-Free Book gửi email này để nhắc nhở về việc trả sách mà bạn đã mượn từ thư viện và đã
                                quá hạn trả theo thỏa thuận. Bạn vui lòng trả sách trong thời gian sớm nhất để tránh
                                phát sinh chi phí.<br /><br />
                                Dưới đây là danh sách đến hạn:

                            <table border width="100%" style="margin-top: 10px;">
                                <tr>
                                    <th>Tên sách</th>
                                    <th>Ngày hẹn</th>
                                    <th>Tình trạng</th>
                                </tr>
                                ${borrows
                                  .map((item: any) => {
                                    try {
                                      const diff = dayjs(item.returnDate).diff(
                                        dayjs(),
                                        "days"
                                      );
                                      return `<tr>
                                      <td>${item?.book?.[0].name}</td>
                                      <td>${dayjs(item.returnDate).format(
                                        "DD/MM/YYYY"
                                      )}</td>
                                      <td style="color: ${
                                        diff > 0 ? "orange" : "red"
                                      }">${
                                        diff > 0 ? "Còn" : "Quá hạn"
                                      } ${Math.abs(diff)} ngày</td>
                                  </tr>`;
                                    } catch (error) {}
                                  })
                                  .join("")}
                            </table>
                            </p>
                        </td>
                    </tr>

                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 0 24px;; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Nếu bạn đã trả sách nhưng vẫn nhận được email này, xin vui lòng bỏ
                                qua. Nếu có bất kỳ trở ngại nào hoặc bạn cần thêm thời gian để trả sách, xin vui lòng
                                liên hệ
                                với chúng tôi ngay lập tức để chúng ta có thể thảo luận về các phương án khác nhau.
                                <br /><br />

                                Cảm ơn bạn đã hiểu và tuân thủ các quy định của thư viện, mong rằng bạn sẽ
                                tiếp tục đồng hành cùng D-Free Book.
                            </p>
                        </td>
                    </tr>
                    <!-- end copy -->

                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                            <p style="margin: 0;">Cheers,<br> D-Free Books</p>
                        </td>
                    </tr>
                    <!-- end copy -->

                </table>
                <!--[if (gte mso 9)|(IE)]>
      </td>
      </tr>
      </table>
      <![endif]-->
            </td>
        </tr>
        <!-- end copy block -->

        <!-- start footer -->
        <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <!--[if (gte mso 9)|(IE)]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
          <td align="center" valign="top" width="600">
      <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                    <!-- start unsubscribe -->
                    <tr>
                        <td align="center" bgcolor="#e9ecef"
                            style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">Đây là email quan trọng liên quan tới tài khoản của bạn, không thể
                                unsubscribe.</p>
                            <p style="margin: 0;">D-Free Books</p>
                        </td>
                    </tr>
                    <!-- end unsubscribe -->

                </table>
                <!--[if (gte mso 9)|(IE)]>
      </td>
      </tr>
      </table>
      <![endif]-->
            </td>
        </tr>
        <!-- end footer -->
    </table>
    <!-- end body -->

</body>

</html>`;
