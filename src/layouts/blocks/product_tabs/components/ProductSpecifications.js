// import ant design components:
import { Anchor, Button, Col, Row, Skeleton, Space } from "antd";

import { useGetConfig } from "../../../../contexts/config/ConfigContext";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../../../../functions";
import { __ } from "../../../../functions/Helper";
import React from "react";


const ProductSpecifications = ({ features, product_description, isLoading }) => {

  let showFeatures = false,
      showCertifications = false;

  if (features) {
    showFeatures = true;
  //console.log("showFeatures");
  }


  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  // get screen width:
  const { width } = useWindowSize();

  const { Link } = Anchor;

  return (
    <Row className="productSpecifications--container">
      <Col span={24} className="productSpecifications--sectionAnchorLinks">
        <Anchor offsetTop={66} targetOffset={135}>
          {isLoading ?
            <Skeleton.Input style={{ width: 150, height: 20 }} active={true} size={"small"} /> :

            (features && features?.length !== 0) &&
              <Link href="#features-section" title={ t(__('Technical Specifications')) } />
          }

          {isLoading ?
            <Skeleton.Input style={{ width: 120, height: 20 }} active={true} size={"small"} /> :

            product_description &&
            <Link href="#description-section" title={ t(__('Product Description')) } />
          }

          {isLoading ?
            <Skeleton.Input style={{ width: 100, height: 20 }} active={true} size={"small"} /> :

            showFeatures &&
              <Link href="#certifications-section" title={ t(__('Certifications')) } />
          }


        </Anchor>
      </Col>

      <Col span={24} className="productSpecifications--sections">
        <div style={{ marginTop: 30 }}>

          {/*if product features isset*/}
          {isLoading ?
            <Skeleton active={true} paragraph={{ rows: 12 }} /> :

            (features && features?.length !== 0) &&
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

          {/*if product description isset*/}
          {isLoading ?
            <Skeleton active={true} paragraph={{ rows: 12 }} /> :

            product_description &&
              <div id="description-section" style={{ marginTop: '2em' }}>
                <p dangerouslySetInnerHTML={ { __html: product_description }} />
              </div>
          }

          {/*if Management Certification & Product Certification feature isset*/}
          {/*{isLoading ?
            <Skeleton active={true} paragraph={{ rows: 12 }} /> :

            ((features && features?.length !== 0) && features[3231]?.feature_id === "3231" || features[3260]?.feature_id === "3260") &&
              <div id="certifications-section" style={{ marginTop: '2em' }}>
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequatur culpa eius ipsum perspiciatis, sed tenetur? Eum, minus, optio? Accusamus alias aliquid doloribus earum et eum, excepturi facilis mollitia nihil numquam pariatur perspiciatis totam voluptatum. Ad inventore obcaecati porro saepe veniam? Adipisci amet aperiam, asperiores at aut consequatur consequuntur cupiditate dolores ducimus, eius error esse ipsum iure iusto magni minus nihil numquam placeat porro quae qui quibusdam quo, quod similique sint totam veniam! Aliquam assumenda commodi cupiditate dicta dolore dolorem doloremque eligendi exercitationem explicabo fugiat hic incidunt ipsam magni natus non, perspiciatis, quae quas qui quibusdam soluta tenetur, unde velit veritatis! A animi aperiam dolorem ducimus eligendi eveniet, ex illo itaque laboriosam minima numquam, perferendis quia, reiciendis tempora voluptas. Ad aliquam aliquid amet commodi consequatur cupiditate debitis delectus doloribus dolorum ea explicabo facere illum impedit, incidunt iste iure iusto magnam minima pariatur possimus qui quia quidem quisquam ratione recusandae reiciendis repellat sint ut veritatis voluptatum. Accusamus aliquam architecto aspernatur assumenda commodi consequatur delectus dignissimos dolor dolorem dolores doloribus ea eius est eum hic illo impedit incidunt labore magnam modi, nesciunt odit quibusdam quidem quis quo quod recusandae repudiandae rerum saepe similique sit totam voluptates voluptatibus. Aperiam consequuntur delectus ea illo ipsam, iste iure libero magnam minima molestias omnis pariatur placeat suscipit velit voluptatum! Nemo, pariatur voluptatibus! Aliquid amet at, atque consequatur deserunt dolorem eius enim facere fugiat harum in ipsum nam nihil numquam placeat praesentium quam quasi quidem quis reprehenderit sequi, sit tempora ullam unde vel vero voluptate voluptatem. Aperiam aut cum, dicta doloribus earum eligendi excepturi facere fuga illo illum laudantium minima nihil odio officia porro recusandae repellat repellendus tempore totam voluptatibus? Aliquam autem eos nisi perferendis quibusdam quisquam, recusandae sequi suscipit tenetur voluptatibus. Aliquid amet at beatae commodi culpa cum cumque debitis deserunt doloribus, ea eaque earum incidunt ipsa ipsam laudantium magnam maiores mollitia nihil non nostrum, officia optio pariatur perspiciatis quasi quidem reprehenderit rerum, voluptas. A assumenda, at cumque esse, incidunt ipsam nemo nihil nisi nobis obcaecati pariatur quas repellat similique. Architecto assumenda blanditiis et ex explicabo modi nostrum quisquam quos sunt veniam. Ad esse magni ratione!
              </div>
          }
          */}
        </div>
      </Col>
    </Row>
  );
};

export default ProductSpecifications;
