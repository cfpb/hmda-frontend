import { DataBrowser } from "./DataBrowser"
import { DataDocs } from "./DataDocs"
import { ChangeLog } from "./ChangeLog"
import { DataPublication } from "./DataPublication"
import { ResearchAndReports } from "./ResearchAndReports"
import iconSprite from "../../common/uswds/img/sprite.svg"



export const DataInfo = ({ config }) => {
    return (
        <>
        <h3 className="alt">
            <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
                <use href={`${iconSprite}#insights`}></use>
            </svg> Data Info
        </h3>
        <ul className="usa-card-group">
            <DataBrowser />
            <DataDocs />
            <ChangeLog />
            <DataPublication {...config} />
            <ResearchAndReports />
        </ul>
        </>
    )
}