import React from 'react';

// import Style File:
import './styles/Factories.less';

// import ANT Design Components Used:
import { Col, Row, Skeleton, Space } from "antd";

// import factories icon:
import aghigh from '../assets/images/store-icon/1.png';
import farrahi from '../assets/images/store-icon/2.png';
import savin from '../assets/images/store-icon/3.png';
// import bg image:
import topSectionBg from '../assets/images/factoriezTopSectionBg.png';
// import factories image:
import factoryImage_1 from '../assets/images/factoryImages/1.png';
import factoryImage_2 from '../assets/images/factoryImages/2.png';
import factoryImage_3 from '../assets/images/factoryImages/3.png';

// data for show:
const factoriesData = [
  {
    'factory_id': 122,
    'logo': 'farrahi',
    'factory': 'Farrahi carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 123,
    'logo': 'aghigh',
    'factory': 'Aghigh carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 124,
    'logo': 'farrahi',
    'factory': 'Farrahi carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 125,
    'logo': 'savin',
    'factory': 'Savin carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 126,
    'logo': 'farrahi',
    'factory': 'Farrahi carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 127,
    'logo': 'savin',
    'factory': 'Savin carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 128,
    'logo': 'aghigh',
    'factory': 'Aghigh carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 129,
    'logo': 'farrahi',
    'factory': 'Farrahi carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 132,
    'logo': 'farrahi',
    'factory': 'Farrahi carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 133,
    'logo': 'savin',
    'factory': 'Savin carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 134,
    'logo': 'farrahi',
    'factory': 'Farrahi carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 135,
    'logo': 'aghigh',
    'factory': 'Aghigh carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 136,
    'logo': 'savin',
    'factory': 'Savin carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 137,
    'logo': 'farrahi',
    'factory': 'Farrahi carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 138,
    'logo': 'farrahi',
    'factory': 'Farrahi carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
  {
    'factory_id': 139,
    'logo': 'savin',
    'factory': 'Savin carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam at, iusto molestias mollitia nesciunt officia officiis quae sequi!',
    'products': [
      {
        'product_id': 1141
      },
      {
        'product_id': 1142
      },
      {
        'product_id': 1143
      },
      {
        'product_id': 1144
      }
    ],
    'factories_fields': [
      {
        'group_id': 67,
        'caption': 'Production capability',
        'values': [
          {
            'field_id': 68,
            'caption': 'Total employees',
            'value': 521
          },
          {
            'field_id': 69,
            'caption': 'Factory size',
            'value': '4000 m²'
          },
          {
            'field_id': 70,
            'caption': 'R&D employees',
            'value': 2
          }
        ]
      },
      {
        'group_id': 80,
        'caption': 'Export Capability',
        'values': [
          {
            'field_id': 85,
            'caption': 'Main Markets',
            'value': 'Iraq Afghanistan Syria Oman'
          },
          {
            'field_id': 89,
            'caption': 'Export rate',
            'value': '700,000 $'
          }
        ]
      }
    ]
  },
];

const Factories = () => {
  return (
    <div className="bg-footer factories--pageSection">
      <Row className="factories--container">
        <Col span={24} className="px-6 pt-6 pb-3 factories--topSection bottomShadow clipShadow">
          <Row justify={"space-between"}>
            <Col className="text-white">
              <div className="vv-font-size-5 font-weight-bold font-italic">Premium OEM Factories</div>
              <div className="vv-font-size-2 font-weight-600 mt-3">Manufacturers assessed by independent third parties</div>
              <div className="mt-4">
                <Space size={"middle"} >
                  <i className="fas fa-lightbulb display-3 font-weight-bold" />
                  <span className="vv-font-size-2 font-weight-600">High-performance manufacturing capacity</span>
                </Space>
              </div>
              <div className="mt-4">
                <Space size={"middle"} >
                  <i className="fas fa-cog display-3 font-weight-bold" />
                  <span className="vv-font-size-2 font-weight-600">R&D capability  for customization</span>
                </Space>
              </div>
              <div className="mt-4">
                <Space size={"middle"} >
                  <i className="fas fa-file-certificate display-3 font-weight-bold" />
                  <span className="vv-font-size-2 font-weight-600">Professional certifications and approvals</span>
                </Space>
              </div>
            </Col>
            <Col>
              <img src={topSectionBg} alt="bg"/>
            </Col>
          </Row>
        </Col>

        <Col span={24} className="px-6 factories--bottomSection">
          <Row gutter={[0, 50]} className="factories--items">
            {factoriesData.map((factoryData, i) => {
              return (
                <Col span={24} key = { factoryData.factory_id } className="bg-white rounded-10 p-3 factories--item">
                  <Row gutter={16}>
                    <Col className="factories--imageContainer">
                      {factoryData.logo === 'farrahi' &&
                        <img src={ factoryImage_1 } alt="farrahi"/>
                      }

                      {factoryData.logo === 'aghigh' &&
                      <img src={ factoryImage_2 } alt="farrahi"/>
                      }

                      {factoryData.logo === 'savin' &&
                      <img src={ factoryImage_3 } alt="farrahi"/>
                      }
                    </Col>
                    <Col className="factories--dataContainer">
                      <Row gutter={[0,8]}>
                        <Col span={24}>
                          <Row justify={"space-between"}>
                            <Col>

                            </Col>
                            <Col>

                            </Col>
                          </Row>
                        </Col>
                        <Col span={24}>

                        </Col>
                        <Col span={24}>

                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export { Factories };