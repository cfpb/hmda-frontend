import { Filing } from "./Filing";
import { FilingDocs } from "./FilingDocs";
import { FilingGuides } from "./FilingGuides";
import iconSprite from "../../common/uswds/img/sprite.svg";




export const FilerInfo = () => {
    return (
      <>
<h3>
  <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
    <use href={`${iconSprite}#account_balance`}></use>
  </svg> Filer Info
</h3>
<section className="usa-card-group">
      <Filing />
      <FilingDocs />
      <FilingGuides />
</section>
      </>
    )
}