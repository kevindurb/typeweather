import * as React from 'react';

export enum IconType {
  cloud = 'cloud'
}

interface IconProps {
  type: IconType
  size?: number
}

function Icon({ type, size = 24 }: IconProps) {
  const [imgSrc, setSrc] = React.useState();

  React.useEffect(() => {
    import(`bootstrap-icons/icons/${type}.svg`)
      .then(svg => setSrc(svg.default))
  }, [type]);

  const style = React.useMemo(() => ({
    width: size,
    height: size,
  }), [size])

  if (!imgSrc) return null;

  return (
    <img src={imgSrc} style={style} alt="current weather" />
  )
}

export default React.memo(Icon);
