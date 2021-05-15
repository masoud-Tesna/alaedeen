import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

// import Style File:
import './styles/Factories.less';

// import ANT Design Components Used:
import { Button, Col, Row, Skeleton, Space } from "antd";

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
// import Products image:
import product_1 from '../assets/images/products/4.png';
import product_2 from '../assets/images/products/5.png';
import product_3 from '../assets/images/products/6.png';
import product_4 from '../assets/images/products/7.png';
// import Verified
import verifiedIcon from '../assets/images/verified.png';
import { CommentOutlined } from "@ant-design/icons";

// import Another Package used:
import TextTruncate from "react-text-truncate";

// import Custom hooks:
import { useQuery } from '../functions';

// data for show:
const factoriesData = [
  {
    'factory_id': 122,
    'logo': 'farrahi',
    'factory': 'Farrahi carpet company',
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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
    'about_us': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, est facere inventore ipsum laborum minus nemo odit quisquam repellendus reprehenderit! Accusantium dolorem iusto molestiae nostrum numquam perspiciatis quas quos tenetur!',
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


const FieldValues = ({ fieldValues }) => {
  return (
    <>
      {fieldValues.map((fieldValue, i) => {
        return (
          <>
            <Col className="factories--fieldItem">
              <Row className="factories--fieldRow">
                <Col span={24} className="vv-font-size-1-5 text-black font-weight-bold">{fieldValue.value}</Col>
                <Col span={24} className="vv-font-size-1-4 text-92">{fieldValue.caption}</Col>
              </Row>
            </Col>
          </>
        );
      })}
    </>
  );
}

const GroupFields = ({ groupFields }) => {
  return (
    <>
      {groupFields.map((groupField, i) => {
          return (
            <Col span={12} key = { groupField.group_id }>
              <div className="py-2 px-3 factories--informationItem">
                <Row>
                  <Col span={24} className="vv-font-size-1-4 text-33">{groupField.caption}:</Col>
                  <Col span={24} className="vv-font-size-1-4 text-33">
                    <Row justify={"space-between"}>
                      <FieldValues fieldValues = { groupField.values } />
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          );
        })}
    </>
  );
}

const Factories = () => {

  const { pathname } = useLocation();

  const factory_param_id = useQuery().get('factory');
  const [factoryDataInParam, setFactoryDataInParam] = useState([]);

  if (factory_param_id) {
    {
      factoriesData.map((factoryData, i) => {
        if (factoryData.factory_id == factory_param_id) {
          setFactoryDataInParam([factoryData]);
          factoriesData.splice(i, 1);
        }
      });
    }
  }



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  console.log(factoryDataInParam);

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

            {factoryDataInParam && factory_param_id &&
              <>
                {factoryDataInParam.map((data, k) => {
                  return (
                    <>
                      <Col span={24} key = { data.factory_id } className="bg-f7 rounded-10 p-3 factories--item byParam">
                        <Row gutter={16} className="h-100">
                          <Col flex='400px' className="h-100 factories--imageContainer">
                            {data.logo === 'farrahi' &&
                              <img src={ factoryImage_1 } alt="farrahi"/>
                            }

                            {data.logo === 'aghigh' &&
                              <img src={ factoryImage_2 } alt="farrahi"/>
                            }

                            {data.logo === 'savin' &&
                              <img src={ factoryImage_3 } alt="farrahi"/>
                            }
                          </Col>
                          <Col flex="1 1" className="factories--dataContainer">
                            <Row gutter={[0,8]}>
                              <Col className="factories--data__topSection" span={24}>
                                <Row justify={"space-between"}>
                                  <Col>
                                    <Row gutter={16}>
                                      <Col className="factories--iconContainer">
                                        {data.logo === 'farrahi' &&
                                        <img src={ farrahi } alt="farrahi"/>
                                        }

                                        {data.logo === 'aghigh' &&
                                        <img src={ aghigh } alt="farrahi"/>
                                        }

                                        {data.logo === 'savin' &&
                                        <img src={ savin } alt="farrahi"/>
                                        }
                                      </Col>
                                      <Col>
                                        <Row className="h-100">
                                          <Col span={24} className="vv-font-size-1-6 text-black font-weight-600">
                                            { data.factory }
                                          </Col>
                                          <Col span={24} className="mt-2">
                                            <img src={ verifiedIcon } alt="verified"/>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col className="text-right factories--btnContainer">
                                    <Space size={"middle"}>
                                      <Button type="primary" icon={<CommentOutlined className="vv-font-size-1-7" />} className="p-0 bg-primary-darken border-primary-darken factories--btn__chat" size={"large"}>Chat Now</Button>
                                      <Button icon={<i className="far fa-address-book vv-font-size-1-7" />} className="p-0 bg-transparent text-primary-darken border-0 factories--btn__contacts" size={"large"}>Contacts</Button>
                                    </Space>
                                  </Col>
                                </Row>
                              </Col>
                              <Col className="factories--data__middleSection" span={24}>
                                <Row gutter={16}>
                                  <Col span={4}>
                                    <TextTruncate
                                      className="vv-font-size-1-6 font-weight-600"
                                      line={6}
                                      element="span"
                                      truncateText=" …"
                                      text={`About Us: ${data.about_us}`}
                                    />
                                  </Col>
                                  <Col span={20}>
                                    <Row gutter={16}>
                                      <Col span={6} className="factories--productImageContainer">
                                        <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                                          <img src={ product_1 } alt="product_1"/>
                                        </div>
                                      </Col>
                                      <Col span={6} className="factories--productImageContainer">
                                        <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                                          <img src={ product_2 } alt="product_2"/>
                                        </div>
                                      </Col>
                                      <Col span={6} className="factories--productImageContainer">
                                        <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                                          <img src={ product_3 } alt="product_3"/>
                                        </div>
                                      </Col>
                                      <Col span={6} className="factories--productImageContainer">
                                        <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                                          <img src={ product_4 } alt="product_4"/>
                                        </div>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col className="factories--data__bottomSection" span={24}>
                                <Row gutter={16} className="factories--informationContainer">
                                  <GroupFields groupFields = { data.factories_fields } />
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </>
                  );
                })}
              </>
            }

            {factoriesData.map((factoryData, i) => {
              return (
                <>
                  <Col span={24} key = { factoryData.factory_id } className="bg-white rounded-10 p-3 factories--item">
                    <Row gutter={16} className="h-100">
                      <Col flex='400px' className="h-100 factories--imageContainer">
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
                      <Col flex="1 1" className="factories--dataContainer">
                        <Row gutter={[0,8]}>
                          <Col className="factories--data__topSection" span={24}>
                            <Row justify={"space-between"}>
                              <Col>
                                <Row gutter={16}>
                                  <Col className="factories--iconContainer">
                                    {factoryData.logo === 'farrahi' &&
                                    <img src={ farrahi } alt="farrahi"/>
                                    }

                                    {factoryData.logo === 'aghigh' &&
                                    <img src={ aghigh } alt="farrahi"/>
                                    }

                                    {factoryData.logo === 'savin' &&
                                    <img src={ savin } alt="farrahi"/>
                                    }
                                  </Col>
                                  <Col>
                                    <Row className="h-100">
                                      <Col span={24} className="vv-font-size-1-6 text-black font-weight-600">
                                        { factoryData.factory }
                                      </Col>
                                      <Col span={24} className="mt-2">
                                        <img src={ verifiedIcon } alt="verified"/>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col className="text-right factories--btnContainer">
                                <Space size={"middle"}>
                                  <Button type="primary" icon={<CommentOutlined className="vv-font-size-1-7" />} className="p-0 bg-primary-darken border-primary-darken factories--btn__chat" size={"large"}>Chat Now</Button>
                                  <Button icon={<i className="far fa-address-book vv-font-size-1-7" />} className="p-0 text-primary-darken border-0 factories--btn__contacts" size={"large"}>Contacts</Button>
                                </Space>
                              </Col>
                            </Row>
                          </Col>
                          <Col className="factories--data__middleSection" span={24}>
                            <Row gutter={16}>
                              <Col span={4}>
                                <TextTruncate
                                  className="vv-font-size-1-6 font-weight-600"
                                  line={6}
                                  element="span"
                                  truncateText=" …"
                                  text={`About Us: ${factoryData.about_us}`}
                                />
                              </Col>
                              <Col span={20}>
                                <Row gutter={16}>
                                  <Col span={6} className="factories--productImageContainer">
                                    <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                                      <img src={ product_1 } alt="product_1"/>
                                    </div>
                                  </Col>
                                  <Col span={6} className="factories--productImageContainer">
                                    <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                                      <img src={ product_2 } alt="product_2"/>
                                    </div>
                                  </Col>
                                  <Col span={6} className="factories--productImageContainer">
                                    <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                                      <img src={ product_3 } alt="product_3"/>
                                    </div>
                                  </Col>
                                  <Col span={6} className="factories--productImageContainer">
                                    <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                                      <img src={ product_4 } alt="product_4"/>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                          <Col className="factories--data__bottomSection" span={24}>
                            <Row gutter={16} className="factories--informationContainer">
                              <GroupFields groupFields = { factoryData.factories_fields } />
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export { Factories };