import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'

import './Methodology.css'

const Methodology = () => {
  return (
    <div className='methodology grid' id='main-content'>
      <Heading
        type={1}
        headingText='Methodology for Determining Average Prime Offer Rates'
      >
        <p className='font-lead'>
          The calculation of average prime offer rates (APORs) is based on
          survey data for eight mortgage products (the eight products): (1)
          30-year fixed-rate; (2) 20-year fixed-rate; (3) 15-year fixed-rate;
          (4) 10-year fixed-rate; (5) 10/6 variable rate; (6) 7/6 variable rate;
          (7) 5/6 variable rate; and (8) 3/6 variable rate{' '}
          <a href='#footnote'>
            <sup>[1]</sup>
          </a>
          . The survey data includes data for “best quality,” 80 percent or less
          loan-to-value, first-lien loans. All four variable-rate products
          adjust to an index based on the 30-day Secured Overnight Financing
          Rate (SOFR) plus a margin and adjust every six months after the
          initial, fixed-rate period. The Consumer Financial Protection Bureau
          (CFPB) makes available the survey data used to calculate APORs. This
          Methodology first describes all the steps necessary to calculate
          average prime offer rates and then provides a numerical example
          illustrating each step with data from the week of March 5, 2023.
        </p>
        <p>
          <Link to='/tools/rate-spread'>
            Go back to the Rate Spread Calculator
          </Link>
        </p>
      </Heading>
      <p>
        The survey data includes nationwide average offer prices each week. For
        each loan type the average commitment loan rate and points are reported,
        with the points expressed as percentages of the initial loan balance.
        For the fixed-rate products, the commitment rate is the contract rate on
        the loan; for the variable-rate products, it is the initial contract
        rate. For the variable-rate products, the average fully-indexed rate,
        which is the index plus margin, is also reported.
      </p>
      <p>
        The survey data are used to compute an annual percentage rate (APR) for
        the eight products. See Regulation Z official commentary, 12 CFR part
        1026, Supp. I, comment 17(c)(1)-10 (creditors to compute a composite APR
        where initial rate on variable-rate transaction not determined by
        reference to index and margin). In computing the APR for the eight
        products, a fully amortizing loan is assumed, with monthly compounding.
        A two-percentage-point cap on the annual interest rate adjustments is
        assumed for the variable-rate products. For the eight products, the APR
        is calculated using the actuarial method, pursuant to appendix J to
        Regulation Z. A payment schedule is used that assumes equal monthly
        payments (even if this entails fractions of cents), assumes each payment
        due date to be the 1st of the month regardless of the calendar day on
        which it falls, treats all months as having 30 days, and ignores the
        occurrence of leap years. See 12 CFR 1026.17(c)(3). The APR calculation
        also assumes no irregular first period or per diem interest collected.
      </p>
      <p>
        The survey data cover fixed-rate loans with terms to maturity of 30, 20,
        15, and 10 years and variable-rate mortgages with initial, fixed-rate
        periods of 10, 7, 5, and 3 years. The CFPB uses interpolation and
        extrapolation techniques to estimate APRs for seven additional products
        (2/6 and 1/6 variable-rate loans and 7-, 5-, 3-, 2-, and 1-year
        fixed-rate loans) to use along with the eight products in the survey
        data.
      </p>
      <p>
        The Treasury Department makes available yields on its securities with
        terms to maturity of, among others, one, two, three, five, seven, and
        ten years (see
        http://www.treas.gov/offices/domestic-finance/debt-management/interest-rate/yield.shtml).
        The CFPB uses these data to estimate APRs for 2/6 and 1/6 variable-rate
        mortgages. These two additional variable-rate products are assumed to
        have the same terms and features as the 10/6, 7/6, 5/6, and 3/6
        variable-rate products in the survey data other than the length of the
        initial, fixed-rate period.
      </p>
      <p>
        The fully-indexed rate and points for the 2/6 and 1/6 variable-rate
        products are set equal to the fully-indexed rate and points for the 3/6
        variable-rate product from the survey data. The initial interest rate
        for the 2/6 and 1/6 variable-rate products is estimated by a two-step
        process. First, the spread between the initial interest rate on the 3/6
        variable-rate product and the three-year Treasury yield is used as the
        Treasury spread. The second step is to add the Treasury spread to the
        Treasury yield for the appropriate initial, fixed-rate period. All
        Treasury yields used in this two-step process are the Monday-Wednesday
        close-of-business averages, as described above. Thus, for example, for
        the 2/6 variable-rate product the estimated Treasury spread is added to
        the average two-year Treasury rate, and for the 1/6 variable-rate
        product the Treasury spread is added to the average one-year Treasury
        rate.
      </p>
      <p>
        Thus estimated, the initial rates, points, and fully-indexed rates are
        used to construct an APR for the 2/6 and 1/6 variable-rate products. To
        estimate APRs for 7-, 5-, 3-, 2-, and 1-year fixed-rate loans,
        respectively, the CFPB uses the initial interest rates and points, but
        not the fully-indexed rates, of the 7/6, 5/6 3/6, 2/6, and 1/6
        variable-rate loan products discussed above.
      </p>
      <p>
        For any loan for which an APR of the same term to maturity or initial,
        fixed-rate period, as applicable, (collectively, for purposes of this
        paragraph, “term”) is not included among the 15 products derived or
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
        The eight APRs obtained directly from survey data for the eight
        products, the seven additional APRs estimated from survey data in the
        manner described above, and the APRs determined by the foregoing
        assignment rules are the average prime offer rates for their respective
        comparable transactions. The survey data needed for the above
        calculations generally are made available on Thursday of each week{' '}
        <a href='#footnote2'>
          <sup>[2]</sup>
        </a>
        . APRs representing average prime offer rates derived, estimated, or
        determined as above are posted in tables on the FFIEC’s rate spread
        calculator page the following day. Those average prime offer rates are
        effective beginning the following Monday and until the next posting
        takes effect.
      </p>

      <h2>Numerical Example:</h2>
      <p>
        The week of March 5th through March 11th, 2023 is used to illustrate the
        average prime offer rate calculation methodology. On Thursday March 2nd,
        the following survey data reflecting national mortgage rate averages for
        the latest week (each variable is expressed in percentage points) were
        available:
      </p>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>Rate</td>
            <td>Points/Fees</td>
            <td>Fully-Indexed Rate</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>30-year fixed-rate</td>
            <td>6.54</td>
            <td>1.21</td>
            <td>NA</td>
          </tr>
          <tr>
            <td>20-year fixed-rate</td>
            <td>6.29</td>
            <td>0.87</td>
            <td>NA</td>
          </tr>
          <tr>
            <td>15-year fixed-rate</td>
            <td>5.98</td>
            <td>1.21</td>
            <td>NA</td>
          </tr>
          <tr>
            <td>10-year fixed-rate</td>
            <td>5.63</td>
            <td>1.59</td>
            <td>NA</td>
          </tr>
          <tr>
            <td>10/6 variable rate</td>
            <td>5.84</td>
            <td>0.34</td>
            <td>7.44</td>
          </tr>
          <tr>
            <td>7/6 variable rate</td>
            <td>5.74</td>
            <td>0.49</td>
            <td>7.37</td>
          </tr>
          <tr>
            <td>5/6 variable rate</td>
            <td>5.62</td>
            <td>0.56</td>
            <td>7.35</td>
          </tr>
          <tr>
            <td>3/6 variable rate</td>
            <td>5.74</td>
            <td>0.11</td>
            <td>7.31</td>
          </tr>
        </tbody>
      </table>

      <p>
        The survey data contract rate and points for the 30-year, 20-year,
        15-year, and 10-year fixed-rate mortgages are used to compute APRs for
        these four products:
      </p>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>APR</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>30-year fixed-rate</td>
            <td>6.66</td>
          </tr>
          <tr>
            <td>20-year fixed-rate</td>
            <td>6.40</td>
          </tr>
          <tr>
            <td>15-year fixed-rate</td>
            <td>6.17</td>
          </tr>
          <tr>
            <td>10-year fixed-rate</td>
            <td>5.98</td>
          </tr>
        </tbody>
      </table>

      <p>
        The survey data initial rate, points, and fully-indexed rate are used to
        compute APRs for the 10/6, 7/6, 5/6, and 3/6 variable-rate products:
      </p>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>APR</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10/6 variable-rate</td>
            <td>6.42</td>
          </tr>
          <tr>
            <td>7/6 variable-rate</td>
            <td>6.57</td>
          </tr>
          <tr>
            <td>5/6 variable-rate</td>
            <td>6.71</td>
          </tr>
          <tr>
            <td>3/6 variable-rate</td>
            <td>6.91</td>
          </tr>
        </tbody>
      </table>

      <p>
        As a preliminary step in estimating APRs for the 2/6 and 1/6
        variable-rate products, average close-of-business Treasury yields for
        Monday-Wednesday of the latest week are calculated (the three yields
        summed before dividing by three are the close-of-business yields
        reported for February 27th, February 28th, and March 1st):
      </p>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>Rate</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One-year Treasury</td>
            <td>(5.03+5.02+5.06)/3=5.04</td>
          </tr>
          <tr>
            <td>Two-year Treasury</td>
            <td>(4.78+4.81+4.89)/3=4.83</td>
          </tr>
          <tr>
            <td>Three-year Treasury</td>
            <td>(4.49+4.51+4.61)/3=4.54</td>
          </tr>
        </tbody>
      </table>

      <p>
        Data for the 2/6 and 1/6 variable-rate products are estimated using the
        survey data for the 3/6 variable-rate product and yields on the one-,
        two-, and three-year Treasuries:
      </p>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>Initial Rate</td>
            <td>Points/Fees</td>
            <td>Fully-Indexed Rate</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2/6 variable-rate</td>
            <td>(5.74-4.54)+4.83=6.03</td>
            <td>0.11</td>
            <td>7.31</td>
          </tr>
          <tr>
            <td>1/6 variable-rate</td>
            <td>(5.74-4.54)+5.04=6.24</td>
            <td>0.11</td>
            <td>7.31</td>
          </tr>
        </tbody>
      </table>

      <p>
        The foregoing initial rates, points, and fully-indexed rates are used to
        calculate APRs for the 1/6- and 2/6 variable-rate products:
      </p>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>APR</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1/6 variable-rate</td>
            <td>7.22</td>
          </tr>
          <tr>
            <td>2/6 variable-rate</td>
            <td>7.09</td>
          </tr>
        </tbody>
      </table>

      <p>
        The initial rate and points of the variable-rate mortgages calculated
        above are used to estimate APRs for fixed-rate products with terms to
        maturity of seven years or less:
      </p>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>Initial Rate</td>
            <td>Points/Fees</td>
            <td>APR</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7-year fixed</td>
            <td>5.74</td>
            <td>0.49</td>
            <td>5.89</td>
          </tr>
          <tr>
            <td>5-year fixed</td>
            <td>5.62</td>
            <td>0.56</td>
            <td>5.85</td>
          </tr>
          <tr>
            <td>3-year fixed</td>
            <td>5.74</td>
            <td>0.11</td>
            <td>5.81</td>
          </tr>
          <tr>
            <td>2-year fixed</td>
            <td>6.03</td>
            <td>0.11</td>
            <td>6.14</td>
          </tr>
          <tr>
            <td>1-year fixed</td>
            <td>6.24</td>
            <td>0.11</td>
            <td>6.45</td>
          </tr>
        </tbody>
      </table>

      <p>
        The APRs for the remaining fixed-rate and variable-rate products are
        determined as follows:
      </p>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>APR</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4-year fixed rate</td>
            <td>3-year fixed rate</td>
          </tr>
          <tr>
            <td>6-year fixed rate</td>
            <td>5-year fixed rate</td>
          </tr>
          <tr>
            <td>8-year fixed rate</td>
            <td>7-year fixed rate</td>
          </tr>
          <tr>
            <td>9-year fixed rate</td>
            <td>10-year fixed rate</td>
          </tr>
          <tr>
            <td>11-year fixed rate</td>
            <td>10-year fixed rate</td>
          </tr>
          <tr>
            <td>12-year fixed rate</td>
            <td>10-year fixed rate</td>
          </tr>
          <tr>
            <td>13-year fixed rate</td>
            <td>15-year fixed rate</td>
          </tr>
          <tr>
            <td>14-year fixed rate</td>
            <td>15-year fixed rate</td>
          </tr>
          <tr>
            <td>16-year fixed rate</td>
            <td>15-year fixed rate</td>
          </tr>
          <tr>
            <td>17-year fixed rate</td>
            <td>15-year fixed rate</td>
          </tr>
          <tr>
            <td>18-year fixed rate</td>
            <td>20-year fixed rate</td>
          </tr>
          <tr>
            <td>19-year fixed rate</td>
            <td>20-year fixed rate</td>
          </tr>
          <tr>
            <td>21-year fixed rate</td>
            <td>20-year fixed rate</td>
          </tr>
          <tr>
            <td>22-year fixed rate</td>
            <td>20-year fixed rate</td>
          </tr>
          <tr>
            <td>23-year fixed rate</td>
            <td>20-year fixed rate</td>
          </tr>
          <tr>
            <td>24-year fixed rate</td>
            <td>20-year fixed rate</td>
          </tr>
          <tr>
            <td>25-year fixed rate</td>
            <td>20-year fixed rate</td>
          </tr>
          <tr>
            <td>26-year fixed rate</td>
            <td>30-year fixed rate</td>
          </tr>
          <tr>
            <td>27-year fixed rate</td>
            <td>30-year fixed rate</td>
          </tr>
          <tr>
            <td>28-year fixed rate</td>
            <td>30-year fixed rate</td>
          </tr>
          <tr>
            <td>29-year fixed rate</td>
            <td>30-year fixed rate</td>
          </tr>
          <tr>
            <td>31-year – 50-year fixed rates</td>
            <td>30-year fixed rate</td>
          </tr>
          <tr>
            <td>4/6 variable rate</td>
            <td>3/6 variable rate</td>
          </tr>
          <tr>
            <td>6/6 variable rate</td>
            <td>5/6 variable rate</td>
          </tr>
          <tr>
            <td>8/6 variable rate</td>
            <td>7/6 variable rate</td>
          </tr>
          <tr>
            <td>9/6 variable rate</td>
            <td>10/6 variable rate</td>
          </tr>
          <tr>
            <td>11/6 – 50/6 variable rates</td>
            <td>10/6 variable rate</td>
          </tr>
        </tbody>
      </table>

      <hr />
      <p className='text-small'>
        <a name='footnote' href='#footnote'>
          1
        </a>
        . The “30-year”, “20-year”, “15-year”, and “10-year” fixed-rate product
        designations refer to those products’ terms to maturity. The “10/6”,
        “7/6”, “5/6” and “3/6” variable-rate product designations, on the other
        hand, refer to those products’ initial, fixed-rate periods, and the
        adjustment frequency. All variable-rate products discussed in this
        Methodology have 30-year terms to maturity.
      </p>

      <p className='text-small'>
        <a name='footnote2' href='#footnote2'>
          2
        </a>
        . If survey data needed to construct APORs are unavailable on Thursday
        for any given week, the CFPB will republish the APORs from the prior
        week. Those APORs are effective beginning the following Monday and until
        the next posting takes effect.
      </p>
    </div>
  )
}

export default Methodology
