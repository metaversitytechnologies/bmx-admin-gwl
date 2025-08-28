import { Col, Row } from "antd";
import CardComp from "./CardComp";

const OneDayCard = ({ t2 }) => {
  return (
    <Row
      className="gx-pt-2"
      style={{ marginLeft: "-8px", marginRight: "-8px", rowGap: 8 }}>
      <Col xs={24} style={{ paddingLeft: 8, paddingRight: 8 }}>
        {" "}
        <span className="ant-typography gx-text-white">
          <strong>PLAYER A</strong>
        </span>
      </Col>
      <Col style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Row style={{ marginLeft: "-4px", marginRight: "-4px", rowGap: 8 }}>
          <Col xs={8} style={{ paddingLeft: 4, paddingRight: 4 }}>
            <CardComp shown={t2?.[0]?.C1 != "1"} card={t2?.[0]?.C1 || "1"} />
          </Col>
          <Col xs={8} style={{ paddingLeft: 4, paddingRight: 4 }}>
            <CardComp shown={t2?.[0]?.C2 != "1"} card={t2?.[0]?.C2 || "1"} />
          </Col>
          <Col xs={8} style={{ paddingLeft: 4, paddingRight: 4 }}>
            <CardComp shown={t2?.[0]?.C3 != "1"} card={t2?.[0]?.C3 || "1"} />
          </Col>
        </Row>
      </Col>
      <Col xs={24} style={{ paddingLeft: 8, paddingRight: 8 }}>
        {" "}
        <span className="ant-typography gx-text-white">
          <strong>PLAYER B</strong>
        </span>
      </Col>
      <Col style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Row style={{ marginLeft: "-4px", marginRight: "-4px", rowGap: 8 }}>
          <Col xs={8} style={{ paddingLeft: 4, paddingRight: 4 }}>
            <CardComp shown={t2?.[1]?.C1 != "1"} card={t2?.[1]?.C1 || "1"} />
          </Col>
          <Col xs={8} style={{ paddingLeft: 4, paddingRight: 4 }}>
            <CardComp shown={t2?.[1]?.C2 != "1"} card={t2?.[1]?.C2 || "1"} />
          </Col>
          <Col xs={8} style={{ paddingLeft: 4, paddingRight: 4 }}>
            <CardComp shown={t2?.[1]?.C3 != "1"} card={t2?.[1]?.C3 || "1"} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default OneDayCard;
