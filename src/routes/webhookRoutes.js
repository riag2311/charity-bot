var request = require("request");
var axios = require("axios");

const config = require("../config.json");

function getFirstApprovalsCard(roomId) {
  return {
    type: "AdaptiveCard",
    body: [
      {
        type: "Container",
        items: [
          {
            type: "TextBlock",
            size: "Medium",
            weight: "Bolder",
            color: "Dark",
            text: "2 Pending approvals",
            wrap: true
          },
          {
            type: "TextBlock",
            text: "Here's the first report pending your approval:",
            wrap: true
          },
          {
            type: "ColumnSet",
            horizontalAlignment: "Left",
            spacing: "Medium",
            columns: [
              {
                type: "Column",
                horizontalAlignment: "Left",
                verticalContentAlignment: "Center",
                width: "20px"
              },
              {
                type: "Column",
                items: [
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        items: [
                          {
                            type: "TextBlock",
                            height: "stretch",
                            weight: "Bolder",
                            color: "Dark",
                            text: "Employee"
                          },
                          {
                            type: "TextBlock",
                            spacing: "Small",
                            height: "stretch",
                            text: "Report Name"
                          },
                          {
                            type: "TextBlock",
                            spacing: "Medium",
                            text: "Report Date"
                          },
                          {
                            type: "TextBlock",
                            text: "Amount due to employee"
                          },
                          {
                            type: "TextBlock",
                            text: "Claimed Amount"
                          }
                        ],
                        width: "auto"
                      },
                      {
                        type: "Column",
                        items: [
                          {
                            type: "TextBlock",
                            height: "stretch",
                            weight: "Bolder",
                            color: "Dark",
                            text: "Jane Jordan"
                          },
                          {
                            type: "TextBlock",
                            height: "stretch",
                            spacing: "Small",
                            text: "Enterprise Connect 2019"
                          },
                          {
                            type: "TextBlock",
                            spacing: "Medium",
                            text: "2019-06-09"
                          },
                          {
                            type: "TextBlock",
                            text: "$1981.79"
                          },
                          {
                            type: "TextBlock",
                            text: "$1981.79"
                          }
                        ],
                        width: "auto"
                      }
                    ]
                  }
                ],
                width: "stretch"
              }
            ]
          }
        ]
      }
    ],
    actions: [
      {
        type: "Action.Submit",
        id: "firstApprovalCardBtn",
        title: "Approve",
        data: {
          roomId,
          buttonId: "firstApprovalCardBtn"
        }
      },
      {
        type: "Action.ShowCard",
        title: "Send back",
        card: {
          type: "AdaptiveCard",
          style: "emphasis",
          body: [
            {
              type: "Container",
              items: [
                {
                  type: "ColumnSet",
                  horizontalAlignment: "Left",
                  columns: [
                    {
                      type: "Column",
                      items: [
                        {
                          type: "TextBlock",
                          text: "Reason:"
                        }
                      ],
                      width: "auto"
                    },
                    {
                      type: "Column",
                      items: [
                        {
                          type: "Input.Text",
                          id: "comment",
                          placeholder: "Optional comment",
                          isMultiline: true
                        }
                      ],
                      width: "stretch"
                    }
                  ]
                }
              ]
            }
          ],
          actions: [
            {
              type: "Action.Submit",
              id: "firstCardSendBackBtn",
              title: "Submit Send Back",
              data: {
                roomId,
                buttonId: "firstCardSendBackBtn"
              }
            }
          ],
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json"
        }
      },
      {
        type: "Action.OpenUrl",
        title: "View in Concur",
        url: "https://www.concur.co.in/"
      }
    ],
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.0"
  };
}

function getApprovedCard(roomId) {
  return {
    type: "AdaptiveCard",
    body: [
      {
        type: "TextBlock",
        size: "Medium",
        weight: "Bolder",
        color: "Dark",
        text: "Jane Jordan's report is approved",
        wrap: true
      }
    ],
    actions: [
      {
        type: "Action.Submit",
        id: "showNextPendingBtn1",
        title: "Show next pending",
        data: {
          buttonId: "showNextPendingBtn1",
          roomId
        }
      }
    ],
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.0"
  };
}

function getLastApprovalCard(roomId) {
  return {
    type: "AdaptiveCard",
    body: [
      {
        type: "Container",
        items: [
          {
            type: "TextBlock",
            size: "Medium",
            weight: "Bolder",
            color: "Dark",
            text: "1 Pending approval",
            wrap: true
          },
          {
            type: "TextBlock",
            text: "Here's the last report pending your approval:",
            wrap: true
          },
          {
            type: "ColumnSet",
            horizontalAlignment: "Left",
            spacing: "Medium",
            columns: [
              {
                type: "Column",
                horizontalAlignment: "Left",
                verticalContentAlignment: "Center",
                width: "20px"
              },
              {
                type: "Column",
                items: [
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        items: [
                          {
                            type: "TextBlock",
                            height: "stretch",
                            weight: "Bolder",
                            color: "Dark",
                            text: "Employee"
                          },
                          {
                            type: "TextBlock",
                            spacing: "Small",
                            height: "stretch",
                            text: "Report Name"
                          },
                          {
                            type: "TextBlock",
                            spacing: "Medium",
                            text: "Report Date"
                          },
                          {
                            type: "TextBlock",
                            text: "Amount due to employee"
                          },
                          {
                            type: "TextBlock",
                            text: "Claimed Amount"
                          }
                        ],
                        width: "auto"
                      },
                      {
                        type: "Column",
                        items: [
                          {
                            type: "TextBlock",
                            height: "stretch",
                            weight: "Bolder",
                            color: "Dark",
                            text: "Andrew Davis"
                          },
                          {
                            type: "TextBlock",
                            height: "stretch",
                            spacing: "Small",
                            text: "Team offsite in Seattle"
                          },
                          {
                            type: "TextBlock",
                            spacing: "Medium",
                            text: "2019-06-09"
                          },
                          {
                            type: "TextBlock",
                            text: "$2039.12"
                          },
                          {
                            type: "TextBlock",
                            text: "$2039.12"
                          }
                        ],
                        width: "auto"
                      }
                    ]
                  }
                ],
                width: "stretch"
              }
            ]
          }
        ]
      }
    ],
    actions: [
      {
        type: "Action.Submit",
        id: "lastApproveBtn",
        title: "Approve",
        data: {
          roomId,
          buttonId: "lastApproveBtn"
        }
      },
      {
        type: "Action.ShowCard",
        title: "Send back",
        card: {
          type: "AdaptiveCard",
          style: "emphasis",
          body: [
            {
              type: "Container",
              items: [
                {
                  type: "ColumnSet",
                  horizontalAlignment: "Left",
                  columns: [
                    {
                      type: "Column",
                      items: [
                        {
                          type: "TextBlock",
                          text: "Reason:"
                        }
                      ],
                      width: "auto"
                    },
                    {
                      type: "Column",
                      items: [
                        {
                          type: "Input.Text",
                          id: "comment",
                          placeholder: "Optional comment",
                          isMultiline: true
                        }
                      ],
                      width: "stretch"
                    }
                  ]
                }
              ]
            }
          ],
          actions: [
            {
              type: "Action.Submit",
              id: "sendBackBtn",
              title: "Submit Send Back",
              data: {
                roomId,
                buttonId: "sendBackBtn"
              }
            }
          ],
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json"
        }
      },
      {
        type: "Action.OpenUrl",
        title: "View in Concur",
        url: "https://www.concur.co.in/"
      }
    ],
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.0"
  };
}

function getSendBackSuccessCard(roomId) {
  return {
    type: "AdaptiveCard",
    body: [
      {
        type: "TextBlock",
        size: "Medium",
        weight: "Bolder",
        color: "Dark",
        text: "Andrew Davis' report was sent back",
        wrap: true
      },
      {
        type: "TextBlock",
        spacing: "Medium",
        text: "No more pending approvals.",
        wrap: true
      }
    ],
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.0"
  };
}

function postApprovedCard(req, res) {
  console.info(req, "Request");

  res.json({
    success: true
  });

  const approvedCard = getApprovedCard(req.inputs.roomId);

  var options = {
    method: "POST",
    url: "https://api.ciscospark.com/v1/messages",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + config.token
    },
    body: {
      roomId: req.inputs.roomId,
      text: "One request has been approved",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: approvedCard
        }
      ]
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}

function postLastApprovalCard(req, res) {

  res.json({
    success: true
  });

  const lastApprovalCard = getLastApprovalCard(req.inputs.roomId);

  var options = {
    method: "POST",
    url: "https://api.ciscospark.com/v1/messages",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + config.token
    },
    body: {
      roomId: req.inputs.roomId,
      text: "There is one pending approval.",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: lastApprovalCard
        }
      ]
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    // console.log(body);
  });
}

function postFinalSendBackCard(req, res) {

  res.json({
    success: true
  });

  const finalSendBackSuccessCard = getSendBackSuccessCard(req.inputs.roomId);

  var options = {
    method: "POST",
    url: "https://api.ciscospark.com/v1/messages",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + config.token
    },
    body: {
      roomId: req.inputs.roomId,
      text: "Hooray!! There are no more pending approvals.",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: finalSendBackSuccessCard
        }
      ]
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    // console.log(body);
  });
}

module.exports = app => {
  app.post("/api/v1/allMessages", (req, res) => {
    console.info(req.body, "Request")
    if (req.body.data.personEmail != config.botEmail) {
      const firstCard = getFirstApprovalsCard(req.body.data.roomId);

      var options = {
        method: "POST",
        url: "https://api.ciscospark.com/v1/messages",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + config.token
        },
        body: {
          roomId: req.body.data.roomId,
          text: "You have 2 pending approvals.",
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              content: firstCard
            }
          ]
        },
        json: true
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);

        //   console.log(body);
      });
    }
  });

  app.post("/api/v1/attachmentActions", (req, res) => {
    console.info("Reached attachmentActions node");
    const url =
      "https://api.ciscospark.com/v1/attachment/actions/" + req.body.data.id;

    const headers = {
      Authorization: "Bearer " + config.token
    };
    axios
      .get(url, { headers: headers })
      .then(result => {
        switch (result.data.inputs.buttonId) {
          case "firstApprovalCardBtn":
            postApprovedCard(result.data, res);
            break;
          case "showNextPendingBtn1":
            postLastApprovalCard(result.data, res);
            break;
          case "sendBackBtn":
            postFinalSendBackCard(result.data, res);
            break;
          default:
            res.status(500).json({
              error: "The button clicked does not have a listener implemented."
            });
            break;
        }
      })
      .catch(err => console.log(err));
  });
};
