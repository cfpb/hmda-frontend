import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'

import './Methodology.css'

const Methodology_alt = () => {
  return (
    <div className='methodology grid' id='main-content'>
      <Heading
        type={1}
        headingText='Methodology for Determining Average Prime Offer Rates (prior to 4/24/2023)'
      >
        <p className='font-lead'>
          Test The calculation of average prime offer rates is based on survey
          data for four hypothetical mortgage products (the four products): (1)
          30-year fixed-rate; (2) 15-year fixed-rate; (3) five-year
          variable-rate; and (4) one-year variable-rate
          <a href='#footnote'>
            <sup>[1]</sup>
          </a>
          . The survey collects data for a hypothetical, “best quality,” 80%
          loan-to-value, first-lien loan. Both the five-year and one-year
          variable-rate products adjust to an index based on the one-year
          Treasury rate plus a margin and adjust annually after the initial,
          fixed-rate period. The Consumer Financial Protection Bureau (Bureau)
          makes available the{' '}
          <a href='https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/SurveyTable.csv'>
            survey data
          </a>{' '}
          used to calculate APORs. This Methodology first describes all the
          steps necessary to calculate average prime offer rates and then
          provides a numerical example illustrating each step with the data from
          the week of May 19, 2008.
        </p>
        <p>
          <Link to='/tools/rate-spread'>
            Go back to the Rate Spread Calculator
          </Link>
        </p>
      </Heading>
      <p>
        The survey collects nationwide average offer prices each week. For each
        loan type the average commitment loan rate and points are reported, with
        the points expressed as percentages of the initial loan balance. For the
        fixed-rate products, the commitment rate is the contract rate on the
        loan; for the variable-rate products, it is the initial contract rate.
        For the variable-rate products, the average margin is also reported.
      </p>
      <p>
        The survey data are used to compute an annual percentage rate (APR) for
        the 30- and 15-year fixed-rate products. For the two variable-rate
        products, a weekly estimate of the fully-indexed rate (the sum of the
        index and margin) is calculated as the margin (collected in the
        applicable survey) plus the current one-year Treasury rate, which is
        estimated as the average of the close-of-business, one-year Treasury
        rates for Monday, Tuesday, and Wednesday of the survey week. If Treasury
        rate data are available for fewer than three days, only yields for the
        available days are used for the average. Survey data on the initial
        interest rate and points, and the estimated fully indexed rate, are used
        to compute a composite APR for the one- and five-year variable-rate
        mortgage products. See Regulation Z official commentary, 12 CFR part
        1026, Supp. I, comment 17(c)(1)-10 (creditors to compute a composite APR
        where initial rate on variable-rate transaction not determined by
        reference to index and margin).
      </p>
      <p>
        In computing the APR for the four products, a fully amortizing loan is
        assumed, with monthly compounding. A two-percentage-point cap on the
        annual interest rate adjustments is assumed for the variable-rate
        products. For the four products, the APR is calculated using the
        actuarial method, pursuant to appendix J to Regulation Z. A payment
        schedule is used that assumes equal monthly payments (even if this
        entails fractions of cents), assumes each payment due date to be the 1st
        of the month regardless of the calendar day on which it falls, treats
        all months as having 30 days, and ignores the occurrence of leap years.
        See 12 CFR 1026.17(c)(3). The APR calculation also assumes no irregular
        first period or per diem interest collected.
      </p>
      <p>
        The survey data cover fixed-rate loans with terms to maturity of 15 and
        30 years and variable-rate mortgages with initial, fixed-rate periods of
        one and five years. The Bureau uses interpolation techniques to estimate
        APRs for ten additional products (two-, three-, seven-, and ten-year
        variable-rate loans and one-, two-, three-, five-, seven-, and ten-year
        fixed-rate loans) to use along with the four directly surveyed products.
      </p>
      <p>
        The Treasury Department makes available yields on its securities with
        terms to maturity of, among others, one, two, three, five, seven, and
        ten years (see
        http://www.treas.gov/offices/domestic-finance/debt-management/interest-rate/yield.shtml).
        The Bureau uses these data to estimate APRs for two-, three-, seven-,
        and ten-year variable-rate mortgages. These additional variable-rate
        products are assumed to have the same terms and features as the surveyed
        one- and five-year variable-rate products other than the length of the
        initial, fixed-rate period.
      </p>
      <p>
        The margin and points for the two- and three-year variable-rate products
        are estimated as weighted averages of the margins and points of the
        one-year and five-year variable-rate products. For the two-year
        variable-rate loan the weights are 3/4 for the one-year variable-rate
        and 1/4 for the five-year variable-rate. For the three-year
        variable-rate product, the weights are 1/2 each for the one-year and the
        five-year variable rate. For the seven- and ten-year variable-rate
        products, because they fall outside of the range between the one- and
        five-year surveyed variable-rate products, the margin and points of the
        five-year variable-rate product reported in the survey are used instead
        of calculating a weighted average.
      </p>
      <p>
        The initial interest rate for each of the interpolated variable-rate
        products is estimated by a two-step process. First, “Treasury spreads”
        are computed for the two- and three-year variable-rate loans as the
        weighted averages of the spreads between the initial interest rates on
        the one- and five-year surveyed variable-rate products and the one- and
        five-year Treasury yields, respectively. The weights used are the same
        as those used in the calculation of margins and points. For seven- and
        ten-year variable-rate loans, because they fall outside of the range
        between the one- and five-year surveyed variable-rate products, the
        spread between the initial interest rate on the five-year variable-rate
        product and the five-year Treasury yield is used as the Treasury spread
        instead of calculating a weighted average. The second step is to add the
        appropriate Treasury spread to the Treasury yield for the appropriate
        initial, fixed-rate period. All Treasury yields used in this two-step
        process are the Monday-Wednesday close-of-business averages, as
        described above. Thus, for example, for the two-year variable-rate
        product the estimated, two-year Treasury spread is added to the average
        two-year Treasury rate, and for the ten-year variable-rate product the
        five-year Treasury spread is added to the average ten-year Treasury
        rate.
      </p>
      <p>
        Thus estimated, the initial rates, margins, and points are used to
        calculate a fully-indexed rate and ultimately an APR for the two-,
        three-, seven-, and ten-year variable-rate products. To estimate APRs
        for one-, two-, three-, five-, seven-, and ten-year fixed-rate loans,
        respectively, the Bureau uses the initial interest rates and points, but
        not the fully-indexed rates, of the one-, two-, three-, five-, seven-,
        and ten-year variable-rate loan products calculated above.
      </p>
      <p>
        For any loan for which an APR of the same term to maturity or initial,
        fixed-rate period, as applicable, (collectively, for purposes of this
        paragraph, “term”) is not included among the 14 products derived or
        estimated from the survey data by the calculations above, the comparable
        transaction is identified by the following assignment rules: For a loan
        with a shorter term than the shortest applicable term for which an APR
        is derived or estimated above, the APR of the shortest term is used. For
        a loan with a longer term than the longest applicable term for which an
        APR is derived or estimated above, the APR of the longest term is used.
        For all other loans, the APR of the applicable term closest to the
        loan’s term is used; if the loan is exactly halfway between two terms,
        the shorter of the two is used. For example: For a loan with a term of
        eight years, the applicable (fixed-rate or variable-rate) seven-year APR
        is used; with a term of six months, the applicable one-year APR is used;
        with a term of nine years, the applicable ten-year APR is used; with a
        term of 11 years, the applicable ten-year APR is used; and with a term
        of four years, the applicable three-year APR is used. For a fixed-rate
        loan with a term of 16 years, the 15-year fixed-rate APR is used; and
        with a term of 35 years, the 30-year fixed-rate APR is used.
      </p>
      <p>
        The four APRs derived directly from data for the four products, the ten
        additional APRs estimated from survey data in the manner described
        above, and the APRs determined by the foregoing assignment rules are the
        average prime offer rates for their respective comparable transactions.
        The{' '}
        <a href='https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/SurveyTable.csv'>
          survey data
        </a>{' '}
        needed for the above calculations generally are made available on
        Thursday of each week. APRs representing average prime offer rates
        derived, estimated, or determined as above are posted in tables on the{' '}
        <a href='https://ffiec.cfpb.gov/tools/rate-spread'>
          FFIEC’s rate spread calculator page
        </a>{' '}
        the following day. Those average prime offer rates are effective
        beginning the following Monday and until the next posting takes effect.
      </p>
      <p>Numerical Example:</p>
      <p>
        The week of May 19 through 25, 2008 is used to illustrate the average
        prime offer rate calculation Methodology. On Thursday May 15, the
        following survey data reflecting national mortgage rate averages for the
        three day period May 12 through May 14 (each variable is expressed in
        percentage points) were released:
      </p>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>30-year fixed-rate:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Contract rate</td>
            <td>6.01</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>0.6</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>15-year fixed-rate:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Contract rate</td>
            <td>5.60</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>0.5</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Five-year variable-rate:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>5.57</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>0.6</td>
          </tr>
          <tr>
            <td>Margin</td>
            <td>2.75</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>One-year variable-rate:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>5.18</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>0.7</td>
          </tr>
          <tr>
            <td>Margin</td>
            <td>2.75</td>
          </tr>
        </tbody>
      </table>
      <p>
        The survey contract rate and points for the 30-year and 15-year
        fixed-rate mortgages are used to compute APRs for these two products:
      </p>
      <table>
        <tbody>
          <tr>
            <th>30-year fixed-rate</th>
            <td>6.07</td>
          </tr>
          <tr>
            <th>15-year fixed-rate</th>
            <td>5.68</td>
          </tr>
        </tbody>
      </table>
      <p>
        As a preliminary step in calculating APRs for the one-year and five-year
        variable-rate products, average close-of-business Treasury yields for
        the three days in which the survey was conducted are calculated (the
        three yields summed before dividing by three are the close-of-business
        yields reported for May 12th, 13th, and 14th):
      </p>
      <table>
        <tbody>
          <tr>
            <th>One-year Treasury</th>
            <td>(2.01+2.08+2.11)/3=2.07</td>
          </tr>
          <tr>
            <th>Two-year Treasury</th>
            <td>(2.30+2.57+2.53)/3=2.43</td>
          </tr>
          <tr>
            <th>Three-year Treasury</th>
            <td>(2.54+2.70+2.78)/3=2.67</td>
          </tr>
          <tr>
            <th>Five-year Treasury</th>
            <td>(3.00+3.17+3.22)/3=3.13</td>
          </tr>
          <tr>
            <th>Seven-year Treasury</th>
            <td>(3.34+3.49+3.50)/3=3.44</td>
          </tr>
          <tr>
            <th>Ten-year Treasury</th>
            <td>(3.78+3.90+3.92)/3=3.87</td>
          </tr>
        </tbody>
      </table>
      <p>
        The fully-indexed rate for the one-year variable-rate mortgage is
        calculated as the one-year Treasury yield plus the margin:
        2.07+2.75=4.82
      </p>
      <p>
        Because both variable-rate products in the survey data use the same
        margin, the fully-indexed rate for the five-year variable-rate mortgage
        is the same number: 2.07+2.75=4.82 (since each adjusts to the 1-year
        treasury).
      </p>
      <p>
        The initial rate, points, and fully-indexed rate are used to compute
        APRs for the one-year and five-year variable-rate products:
      </p>
      <table>
        <tbody>
          <tr>
            <th>One-year variable-rate</th>
            <td>4.91</td>
          </tr>
          <tr>
            <th>Five-year variable-rate</th>
            <td>5.16</td>
          </tr>
        </tbody>
      </table>
      <p>
        Data for the interpolated two-year and three-year variable-rate
        mortgages are calculated as weighted averages of the figures for the
        one- and five-year variable-rates, which are used in conjunction with
        the yields on the two- and three-year Treasuries as follows:
      </p>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Two-year variable-rate:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>[3x(5.18-2.07)+1x(5.57-3.13)]/4+2.43=5.37</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>[3x.7+1x.6]/4=.7</td>
          </tr>
          <tr>
            <td>Margin</td>
            <td>[3x2.75+1x2.75]/4=2.75</td>
          </tr>
          <tr>
            <td>Fully-indexed rate</td>
            <td>2.07+2.75=4.82</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Three-year variable-rate:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>[2x(5.18-2.07)+2x(5.57-3.13)]/4+2.67=5.45</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>[2x.7+2x.6]/4=.7</td>
          </tr>
          <tr>
            <td>Margin</td>
            <td>[2x2.75+2x2.75]/4=2.75</td>
          </tr>
          <tr>
            <td>Fully-indexed rate</td>
            <td>2.07+2.75=4.82</td>
          </tr>
        </tbody>
      </table>
      <p>
        The foregoing initial rates, points, margins, and fully-indexed rates
        are used to calculate APRs for the two- and three-year variable-rate
        products:
      </p>
      <table>
        <tbody>
          <tr>
            <th>Two-year variable-rate</th>
            <td>4.97</td>
          </tr>
          <tr>
            <th>Three-year variable-rate</th>
            <td>5.03</td>
          </tr>
        </tbody>
      </table>
      <p>
        Data for the seven-year and ten-year variable-rate products are
        estimated using the survey data for the five-year variable-rate product
        and yields on the seven- and ten-year Treasuries:
      </p>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Seven-year variable-rate:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>(5.57-3.13)+3.44=5.88</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>=.6</td>
          </tr>
          <tr>
            <td>Margin</td>
            <td>=2.75</td>
          </tr>
          <tr>
            <td>Fully-indexed rate</td>
            <td>2.07+2.75=4.82</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Ten-year variable-rate:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>(5.57-3.13)+3.87=6.31</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>=.6</td>
          </tr>
          <tr>
            <td>Margin</td>
            <td>=2.75</td>
          </tr>
          <tr>
            <td>Fully-indexed rate</td>
            <td>2.07+2.75=4.82</td>
          </tr>
        </tbody>
      </table>
      <p>
        The foregoing initial rates, points, margins, and fully-indexed rates
        are used to calculate APRs for the seven- and ten-year variable-rate
        products:
      </p>
      <table>
        <tbody>
          <tr>
            <th>Seven-year variable-rate</th>
            <td>5.40</td>
          </tr>
          <tr>
            <th>Ten-year variable-rate</th>
            <td>5.85</td>
          </tr>
        </tbody>
      </table>
      <p>
        The initial rate and points of the variable-rate mortgages calculated
        above are used to estimate APRs for fixed-rate products with terms to
        maturity of ten years or less:
      </p>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>One-year fixed:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>5.18</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>.7</td>
          </tr>
          <tr>
            <td>APR</td>
            <td>6.49</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Two-year fixed:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>5.37</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>.7</td>
          </tr>
          <tr>
            <td>APR</td>
            <td>6.06</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Three-year fixed:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>5.45</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>.7</td>
          </tr>
          <tr>
            <td>APR</td>
            <td>5.92</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Five-year fixed:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>5.57</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>.6</td>
          </tr>
          <tr>
            <td>APR</td>
            <td>5.82</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Seven-year fixed:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>5.88</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>.6</td>
          </tr>
          <tr>
            <td>APR</td>
            <td>6.06</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Ten-year fixed:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial rate</td>
            <td>6.31</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>.6</td>
          </tr>
          <tr>
            <td>APR</td>
            <td>6.44</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <p className='text-small'>
        <a name='footnote' href='#footnote'>
          1
        </a>
        . The “30-year” and “15-year” fixed-rate product designations refer to
        those products’ terms to maturity. The “one-year” and “five-year”
        variable-rate product designations, on the other hand, refer to those
        products’ initial, fixed-rate periods. All variable-rate products
        discussed in this Methodology have 30-year terms to maturity.
      </p>
    </div>
  )
}

export default Methodology_alt
