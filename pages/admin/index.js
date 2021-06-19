import React from "react";
import { withApollo } from "../../lib/apollo";
import A_Login from "../../src/Components/Routes/Layouts/A_Login";
import AdminLayout from "../../src/Components/Routes/Layouts/AdminLayout";

const AdminLogin = () => {
  return (
    <AdminLayout title={`ADMIN | 로그인`} isSide={false}>
      <A_Login />
    </AdminLayout>
  );
};

export default withApollo(AdminLogin);
