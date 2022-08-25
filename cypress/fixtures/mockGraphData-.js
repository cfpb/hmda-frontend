export const firstGraphURLQuery =
  "/applications?periodLow=2018-Q1&periodHigh=2021-Q4&visibleSeries=Conventional%20Conforming,Conventional%20Non-Conforming,FHA,HELOC,RHS/FSA,VA";

export const firstGraphURL =
  "/data-browser/graphs/applications?periodLow=2018-Q1&periodHigh=2021-Q4&visibleSeries=Conventional%20Conforming,Conventional%20Non-Conforming,FHA,HELOC,RHS/FSA,VA";

export const buildURL = (baseURL, endpoint, periodStart, periodEnd, series) => {
  let finalURL = ``;

  if (series) {
    series.forEach((s) => {
      if (/\s/.test(s.name)) {
        s.name.replace(" ", "%20");
      }
    });
  }

  if (endpoint && periodStart && periodEnd && series) {
    finalURL =
      baseURL +
      `/data-browser/graphs/${endpoint}?periodLow=${periodStart}&periodHigh=${periodEnd}&visibleSeries=${series}`;
  }

  return finalURL;
};

export const firstGraphEndpoint = {
  series: [
    {
      name: "Conventional Conforming",
      updated: "2022-06-13 18:01:22.311577",
    },
    {
      name: "Conventional Non-Conforming",
      updated: "2022-06-13 18:01:22.311577",
    },
    {
      name: "FHA",
      updated: "2022-06-13 18:01:22.311577",
    },
    {
      name: "HELOC",
      updated: "2022-06-13 18:01:22.311577",
    },
    {
      name: "RHS/FSA",
      updated: "2022-06-13 18:01:22.311577",
    },
    {
      name: "VA",
      updated: "2022-06-13 18:01:22.311577",
    },
  ],
  subtitle:
    "Conventional conforming applications dramatically increased since 2019. FHA loans temporarily moved higher in 2020 Q3.",
  title: "How has the number of applications changed?",
  xLabel: "Year Quarter",
  yLabel: "Value",
};

export const ALL_GRAPHS_ENDPOINT = {
  graphs: [
    {
      category: "quantity",
      endpoint: "applications",
      title: "How has the number of applications changed?",
    },
    {
      category: "quantity",
      endpoint: "loans",
      title: "How has the number of loans changed?",
    },
    {
      category: "rate",
      endpoint: "credit-scores",
      title: "How have median credit scores changed?",
    },
    {
      category: "rate",
      endpoint: "credit-scores-cc-re",
      title:
        "For conventional conforming loans, how have median credit scores differed by race/ethnicity?",
    },
    {
      category: "rate",
      endpoint: "credit-scores-fha-re",
      title:
        "For FHA loans, how have median credit scores differed by race/ethnicity?",
    },
    {
      category: "rate",
      endpoint: "ltv",
      title: "How has median CLTV changed?",
    },
    {
      category: "rate",
      endpoint: "ltv-cc-re",
      title:
        "For conventional conforming loans, how has median CLTV differed by race/ethnicity?",
    },
    {
      category: "rate",
      endpoint: "ltv-fha-re",
      title: "For FHA loans, how has median CLTV differed by race/ethnicity?",
    },
    {
      category: "rate",
      endpoint: "dti",
      title: "How has median DTI changed?",
    },
    {
      category: "rate",
      endpoint: "dti-cc-re",
      title:
        "For conventional conforming loans, how has median DTI differed by race/ethnicity?",
    },
    {
      category: "rate",
      endpoint: "dti-fha-re",
      title: "For FHA loans, how has median DTI differed by race/ethnicity?",
    },
  ],
  overview:
    "The following graphs present data for the 19 financial institutions reporting HMDA quarterly data throughout 2020 and displays data for each of those institutions for 2019 and 2018 as well.",
};
