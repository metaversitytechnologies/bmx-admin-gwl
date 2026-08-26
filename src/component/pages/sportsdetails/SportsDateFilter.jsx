import { Col, DatePicker, Row } from "antd";
import PropTypes from "prop-types";

const { RangePicker } = DatePicker;

const SportsDateFilter = ({ defaultValue, onChange }) => (
  <Row className="date_picker admin-details-toolbar sports-details-toolbar" justify="start">
    <Col
      xl={24}
      lg={24}
      md={24}
      xs={24}
      className="datepicker_sport sports-details-date-control">
      <RangePicker
        defaultValue={defaultValue}
        onChange={onChange}
        bordered={false}
      />
    </Col>
  </Row>
);

SportsDateFilter.propTypes = {
  defaultValue: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default SportsDateFilter;
