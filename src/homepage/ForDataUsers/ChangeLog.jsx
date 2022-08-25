import { ExpandableCard } from "../ExpandableCard"

export const ChangeLog = () => (
  <>
    <ExpandableCard
      title="HMDA Updates and Notes"
      destination="/updates-notes"
      description="Tracking releases, updates, and corrections to HMDA publications, data products, documentation, and tools."
      disableExpansion={true}
      addNewFeatureIndicator={true}
    />
  </>
)
