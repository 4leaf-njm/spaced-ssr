import React, { useEffect } from "react";
import { withApollo } from "../../lib/apollo";
import AD26 from "../../src/Components/Routes/Admin/AD26";
import AdminLayout from "../../src/Components/Routes/Layouts/AdminLayout";
import { useRouter } from "next/router";
import { toast } from "react-nextjs-toast";
import { useCookies } from "react-cookie";
import { checkCookie } from "../../src/commonUtils";

const MobileMainBannerManagement = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    const userInfo = cookie["info"];
    const checkUser = checkCookie(userInfo);

    if (!checkUser) {
      toast.notify("접근 권한이 없습니다.", {
        duration: 5,
        type: "error",
      });

      router.push("/admin");
    }
  }, []);

  return (
    <AdminLayout title={`ADMIN | 모바일 베너`}>
      <AD26 />
    </AdminLayout>
  );
};

export default withApollo(MobileMainBannerManagement);
