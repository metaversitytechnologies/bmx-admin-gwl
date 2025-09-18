import { Button, Card, Row, Col, message as AntMessage } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetMessageQuery,
  useSetMessageMutation,
} from "../../../store/service/userlistService";
import TextArea from "antd/es/input/TextArea";

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
    <Card
      className="sport_detail"
      title="Set Message"
      extra={<button onClick={() => nav(-1)}>Back</button>}>
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
  );
};

export default SetMessage;
