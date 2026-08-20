const HomeRules = () => {
  const host = window.location.hostname;

  return (
    <>
      <div className="custom-modal-text modal-body">
        <h2> प्रिय ग्राहक,</h2>
        <p>
          {" "}
          आपसे अनुरोध है हमारी कोई डुप्लीकेट साइट नही है हमारी आधिकारिक साइट
          <span
            style={{
              textTransform: "uppercase",
              padding: "0px 2px",
              margin: "0px 2px",
            }}>{`${host?.split(".")[1]}.${host?.split(".")[2]}`}</span>
          से लॉगिन करें। लॉगइन करने से पहले साइट का नाम जरूर देख लें। आपके
          समर्थन के लिए धन्यवाद। टीम {" '"}
          <span
            style={{
              textTransform: "uppercase",
              padding: "0px 2px",
              margin: "0px 2px",
            }}>{`${host?.split(".")[1]}.${host?.split(".")[2]}`}</span>
          {"' "}
        </p>
        <h2>Dear Client,</h2>
        <p>
          {" "}
          We don&lsquo;t have any duplicate site , You are requested to login
          with our official site {" '"}
          <span
            style={{
              textTransform: "uppercase",
              padding: "0px 2px",
              margin: "0px 2px",
            }}>{`${host?.split(".")[1]}.${host?.split(".")[2]}`}</span>
          {"' "}.I only. Please check the site name before you login. Thanks for
          your support. Team {" '"}
          <span
            style={{
              textTransform: "uppercase",
              padding: "0px 2px",
              margin: "0px 2px",
            }}>{`${host?.split(".")[1]}.${host?.split(".")[2]}`}</span>
          {"' "}
        </p>
      </div>
    </>
  );
};

export default HomeRules;
