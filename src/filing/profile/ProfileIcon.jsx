import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../common/uswds/components/Icon'

const ProfileIcon = ({
  iconHeight,
  iconWidth,
  profileText,
  profileTextSize,
}) => {
  return (
    <Link to='/filing/profile' className='profile_icon_container'>
      <Icon
        iconName='person'
        styleIcon={{
          height: iconHeight,
          width: iconWidth,
          marginRight: '4px',
          cursor: 'pointer',
        }}
      />
      <p style={{ fontSize: profileTextSize }}>{profileText}</p>
    </Link>
  )
}

export default ProfileIcon
