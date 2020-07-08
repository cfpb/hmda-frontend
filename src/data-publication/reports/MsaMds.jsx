import React from 'react'
import Selector from './Selector.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import stateToMsas from '../constants/stateToMsas.js'
import fetchMsas from './fetchMsas.js'

const MSA_MDS = {}

class MsaMds extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: !!this.props.msaMds,
      msaMds: this.props.msaMds || []
    }
    if (this.props.msaMds) {
      MSA_MDS[props.match.params.institutionId] = this.props.msaMds
    }
  }

  componentDidMount() {
    if (this.state.msaMds.length) return

    const { params } = this.props.match
    if (params.stateId) {
      this.setState({
        msaMds: stateToMsas[params.year][params.stateId],
        isLoaded: true
      })
    } else {
      if (MSA_MDS[params.institutionId]) {
        return this.setState({
          isLoaded: true,
          msaMds: MSA_MDS[params.institutionId]
        })
      }
      fetchMsas(params.institutionId, params.year).then(
        result => {
          const msaMds = result.msaMds.sort((a,b) => a.id - b.id)
          msaMds.push({ id: 'nationwide' })
          MSA_MDS[params.institutionId] = msaMds
          this.setState({
            isLoaded: true,
            msaMds: msaMds
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error: `${error.status}: ${error.statusText}`
          })
        }
      )
    }
  }

  render() {
    if (this.state.error) return <p>{this.state.error}</p>
    if (!this.state.isLoaded) return <LoadingIcon />

    const options = this.state.msaMds.map(val => {
      let label = val.id
      if (val.name) label += ' - ' + val.name
      else label = val.id.toUpperCase()
      return { value: val.id, label, data: val }
    })

    return (
      <Selector
        options={options}
        placeholder="Select MSA/MD..."
        header="Choose an available MSA/MD"
        {...this.props}
      />
    )
  }
}

export default MsaMds
