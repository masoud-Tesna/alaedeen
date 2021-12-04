// import ant design components:
import { Button, Col, Row, Skeleton, Space } from "antd";

import { useGetConfig } from "../../../../contexts/config/ConfigContext";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../../../../functions";
import { __ } from "../../../../functions/Helper";
import React from "react";


const ProductSpecifications = ({ features, isLoading }) => {

  let showFeatures = false,
      showCertifications = false;

  if (features) {
    showFeatures = true;
  //console.log("showFeatures");
  }

  console.log(features)


  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  // get screen width:
  const { width } = useWindowSize();

  return (
    <Row className="productSpecifications--container">
      <Col span={24} className="productSpecifications--sections">
        {!isLoading ?
          <>
            <Skeleton active={true} paragraph={{ rows: 6 }} />
            <Row className="mt-4">
              <Col span={12}>
                <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "calc(.5 * 65vw + 50%)", "--text-height": "2.55vh" }} active={true} size={"small"} />
              </Col>

              <Col span={12}>
                <Row gutter={[0, 10]} className="skeletons--circle">
                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "15vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "8vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "10vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "10vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "22vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Skeleton active={true} paragraph={{ rows: 3 }} />
            <Row className="mt-4">
              <Col span={12}>
                <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "25vw", "--text-height": "2.55vh" }} active={true} size={"small"} />
              </Col>

              <Col span={12}>
                <Row gutter={[0, 10]} className="skeletons--circle">
                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "25vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "7vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "14vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </> :

          (features && features?.length) &&
          <div id="features-section" >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien
            velit, aliquet eget commodo nec, auctor a sapien. Nam eu neque vulputate
            diam rhoncus faucibus. Curabitur quis varius libero. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Aliquam placerat sem at mauris
            suscipit porta. Cras metus velit, elementum sed pellentesque a, pharetra
            eu eros. Etiam facilisis placerat euismod. Nam faucibus neque arcu, quis
            accumsan leo tincidunt varius. In vel diam enim. Sed id ultrices ligula.
            Maecenas at urna arcu. Sed quis nulla sapien. Nam felis mauris,
            tincidunt at convallis id, tempor molestie libero. Quisque viverra
            sollicitudin nisl sit amet hendrerit. Etiam sit amet arcu sem. Morbi eu
            nibh condimentum, interdum est quis, tempor nisi. Vivamus convallis erat
            in pharetra elementum. Phasellus metus neque, commodo vitae venenatis
            sed, pellentesque non purus. Pellentesque egestas convallis suscipit. Ut
            luctus, leo quis porta vulputate, purus purus pellentesque ex, id
            consequat mi nisl quis eros. Integer ornare libero quis risus fermentum
            consequat. Mauris pharetra odio sagittis, vulputate magna at, lobortis
            nulla. Proin efficitur, nisi vel finibus elementum, orci sem volutpat
            eros, eget ultrices velit mi.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aspernatur, atque dolorum eius exercitationem illo impedit iusto minus natus nemo neque officia officiis, optio quae qui saepe veritatis? A ad, amet blanditiis culpa dicta dolores eius exercitationem facilis fugiat ipsam iusto laudantium maxime necessitatibus neque rerum sapiente soluta temporibus vero! A alias commodi corporis culpa doloremque exercitationem libero placeat quos reprehenderit tempore! A ad adipisci amet, consequatur culpa dolor dolorem, doloribus, earum error est eum eveniet expedita nobis non nostrum perspiciatis praesentium rem sint sunt tempore vel veniam voluptatibus? Alias, architecto autem consectetur corporis cum distinctio dolores ea eaque exercitationem ipsa iusto laboriosam libero magnam magni maiores molestiae nam perferendis porro qui rerum sequi sit suscipit tempora, tempore temporibus tenetur unde vel veniam veritatis, vero? Autem culpa exercitationem iusto numquam officia quia sint tempore. Ab accusantium adipisci aliquam assumenda beatae commodi consequatur corporis cupiditate debitis, distinctio doloremque ducimus ea eligendi explicabo incidunt ipsum iure magnam minima necessitatibus nulla odio officia, officiis omnis porro possimus praesentium provident quidem quod quos sapiente sunt suscipit totam veniam veritatis vero voluptas voluptates? Atque aut deleniti doloremque, ducimus ea iste iusto labore magnam minus nam neque nesciunt, repellendus sed sunt veritatis voluptatibus voluptatum! A accusantium animi architecto delectus eaque enim eos, expedita explicabo hic ipsa ipsam nostrum optio quam quasi quos saepe sit sunt tempora vero voluptates! Ab alias architecto dolore dolores facilis labore unde vel. Culpa dolorum, eos fuga ipsum nisi non provident tempore unde vitae voluptates! A ab, accusamus aliquam beatae doloremque ea est eveniet exercitationem expedita explicabo incidunt itaque magnam minus non officiis perspiciatis placeat provident quas quia quidem ratione repellendus sed suscipit voluptates voluptatibus. Aut culpa libero suscipit vero? Ad cumque eligendi expedita facilis hic illo, maxime molestiae mollitia perspiciatis quae quisquam, sed, tempore ullam vel veritatis. Blanditiis earum illum ratione.
          </div>
        }
      </Col>
    </Row>
  );
};

export default ProductSpecifications;
