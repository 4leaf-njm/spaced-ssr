import React, { useEffect } from "react";
import { withApollo } from "../../lib/apollo";
import AD00 from "../../src/Components/Routes/Admin/AD00";
import AdminLayout from "../../src/Components/Routes/Layouts/AdminLayout";
import { useRouter } from "next/router";
import { toast } from "react-nextjs-toast";
import { useCookies } from "react-cookie";
import { checkCookie } from "../../src/commonUtils";

const AdminMain = () => {
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
    <AdminLayout title={`ADMIN | 메인`}>
      <AD00 />
    </AdminLayout>
  );
};

export default withApollo(AdminMain);
