import {redirect} from "next/navigation";
import securityService from "@/lib/services/security.service";
import {Button, Result} from "antd";
import {WarningOutlined} from "@ant-design/icons";

export default async function AccountVerificationPage({searchParams}: any) {
  if (!searchParams.code) return redirect('/auth/login');
  try {
    await securityService.verifyAccount(searchParams.code);
  } catch (e: any) {
    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Result
        status={'error'}
        title={`Không thể xác thực tài khoản`}
        subTitle={e.message}
      />
      <Button type={'primary'} href={'/auth/login'}>
        Đăng nhập
      </Button>
    </div>
  }
  return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Result
      status={'success'}
      title={`Thành công`}
      subTitle={`Đã xác thực tài khoản. Bây giờ bạn có thể đăng nhập!`}
    />
    <Button type={'primary'} href={'/auth/login'}>
      Đăng nhập
    </Button>
  </div>
}
