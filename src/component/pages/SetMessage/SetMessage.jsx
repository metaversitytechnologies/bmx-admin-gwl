import { Button, Card, Row, Col, message as AntMessage } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Megaphone } from "lucide-react";
import {
  useGetMessageQuery,
  useSetMessageMutation,
} from "../../../store/service/userlistService";
import TextArea from "antd/es/input/TextArea";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const SetMessage = () => {
  const nav = useNavigate();

  const { data, isLoading, refetch } = useGetMessageQuery();
  const [setMessageApi, { isLoading: isSaving }] = useSetMessageMutation();

  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (data?.data) {
      setMsg(data.data);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await setMessageApi({ message: msg }).unwrap();
      refetch();
      AntMessage.success("Message updated successfully!");
    } catch (err) {
      AntMessage.error("Failed to update message.");
    }
  };

  return (
    <div className="main_live_section list_supers admin-details-panel set-message-panel">
      <AppPageHeader
        icon={<Megaphone size={20} strokeWidth={1.8} />}
        title="Set Message"
        subtitle="Update the broadcast message shown to users"
        onBack={() => nav(-1)}
      />
    <Card className="sport_detail">
      <Row style={{ padding: "10px 12px" }}>
        <Col lg={12} xs={24}>
          <div
            style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
            Set Message:
          </div>
          <TextArea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={4}
            placeholder="Enter Message.."
            disabled={isLoading}
          />
          <Button
            style={{ marginTop: "12px" }}
            type="primary"
            onClick={handleSave}
            loading={isSaving}>
            Set Message
          </Button>
        </Col>
      </Row>
    </Card>
    </div>
  );
};

export default SetMessage;
