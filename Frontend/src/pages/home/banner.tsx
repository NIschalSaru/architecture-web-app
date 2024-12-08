import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/images/banner.jpg"

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
        <img src={bannerImg} alt="Banner Image" />
        <div className="container">
          <div className="banner-info">
            {/* <Title level={3}>{banner?.[`heading${currentLang}`]}</Title> */}
            <Title level={3}>Nepal Designers And Builders</Title>
            <Text className="banner-info--text">
              We Design. We Develop
            </Text>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/about")}
            >
            Know more !!!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerComponent;
