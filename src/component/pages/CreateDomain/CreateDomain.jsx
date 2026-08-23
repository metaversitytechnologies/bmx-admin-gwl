import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import UpdateDomian from "./UpdateDomian";
import {
  useAppDetailsQuery,
  useGetCreateAppMutation,
} from "../../../store/service/userlistService";
import CreateDomainHeader from "./CreateDomainHeader";
import CreateDomainForm from "./CreateDomainForm";
import ExistingDomains from "./ExistingDomains";

const CreateDomain = () => {
  const [form] = Form.useForm();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [createApp, { isLoading }] = useGetCreateAppMutation();
  const { data: appDetails, refetch } = useAppDetailsQuery();
  const nav = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [updateData, setUpdateData] = useState({
    isDemoIdLoginAllowed: false,
    multipleSubDomainAllowed: false,
    isSelfAllowed: false,
    transactionCode: "",
    appId: 0,
  });

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("appname", values.appname);
      formData.append("appurl", values.appurl);
      formData.append(
        "isDemoIdLoginAllowed",
        values.permissions?.includes("isDemoIdLoginAllowed")
      );
      formData.append(
        "multipleSubDomainAllowed",
        values.permissions?.includes("multipleSubDomainAllowed")
      );
      formData.append(
        "isSelfAllowed",
        values.permissions?.includes("isSelfAllowed")
      );

      const res = await createApp(formData).unwrap();

      if (res?.status) {
        refetch();
        message.success("Domain created successfully!");
        setUpdateData({
          isDemoIdLoginAllowed: false,
          multipleSubDomainAllowed: false,
          isSelfAllowed: false,
          transactionCode: "",
        });
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  const handleClose = () => {
    setOpenUpdateModal(!openUpdateModal);
  };

  const handleOpenModal = (items) => {
    setOpenUpdateModal(!openUpdateModal);
    setUpdateData({
      appId: items?.appId || 0,
      isDemoIdLoginAllowed: items?.isDemoIdLoginAllowed || false,
      multipleSubDomainAllowed: items?.multipleSubDomainAllowed || false,
      isSelfAllowed: items?.selfAllowed || false,
      transactionCode: "",
    });
  };

  const handleBackClick = () => {
    nav(-1);
  };

  const domains = appDetails?.data || [];

  const filteredDomains = searchTerm.trim()
    ? domains.filter((domain) => {
        const haystack = [domain?.appName, domain?.appUrl, domain?.appId]
          .join(" ")
          .toLowerCase();
        return haystack.includes(searchTerm.trim().toLowerCase());
      })
    : domains;

  const total = filteredDomains.length;
  const pagedDomains = filteredDomains.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="main_live_section list_supers admin-details-panel create-domain-panel">
      <CreateDomainHeader count={domains.length} onBack={handleBackClick} />

      <div className="create-domain-layout">
        <CreateDomainForm
          form={form}
          onFinish={onFinish}
          isLoading={isLoading}
        />

        <ExistingDomains
          total={total}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          data={pagedDomains}
          onUpdate={handleOpenModal}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      <UpdateDomian
        openUpdateModal={openUpdateModal}
        setUpdateData={setUpdateData}
        updateData={updateData}
        handleClose={handleClose}
        refetch={refetch}
      />
    </div>
  );
};

export default CreateDomain;
