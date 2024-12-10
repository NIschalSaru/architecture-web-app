import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import bannerImg from "../../assets/images/banner.jpg";
// interface BannerType {
//   t: TFunction<"translation", undefined>;
//   banner: {
//     id?: number;
//     title?: string;
//     imageUrl?: string;
//     captionsEn?: string;
//     captionsJp?: string;
//     headingEn?: string;
//     headingJp?: string;
//     subHeadingEn?: string;
//     subHeadingJp?: string;
//     createdAt?: string;
//     updatedAt?: string;
//   };
// }
const BannerComponent = () => {
  const { Title, Text } = Typography;
  // const { i18n } = useTranslation();
  const navigate = useNavigate();
  // const currentLang = i18n.language === "en" ? "En" : "Jp";
  return (
    <div className="banner">
      <div>
        {/* <img src={banner?.imageUrl} alt="Banner Image" /> */}
        <img
          src={
            "https://cdna.artstation.com/p/assets/images/images/068/029/138/large/anton-removskyi-2-final.jpg?1696841746"
          }
          alt="Banner Image"
        />
        <div className="container">
          <div className="banner-info">
            <Text className="banner-info--text">
              <span className="dot"></span>
              <span className="text-blue">We Design,</span>{" "}
              <span className="text-red">We Develop</span>
            </Text>
            <Title style={{ margin: "0" }} level={3}>
              Nepal Designers & Builders
            </Title>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/about")}
            >
              <RightOutlined /> Know More
            </Button>
          </div>
        </div>
        {/* Side Button */}
        <Button
          className="side-button"
          onClick={() => alert("Side Button Clicked")}
        >
          Book Here
        </Button>
      </div>
    </div>
  );
};

export default BannerComponent;
