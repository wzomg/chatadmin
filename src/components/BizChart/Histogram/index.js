import React from 'react'
import {Chart, Axis, Geom, Tooltip} from 'bizcharts'

export default function Histogram({data, scale}) {
  return (
      <Chart height={400} data={data} scale={scale} forceFit>
        <Axis name="age"/>
        <Axis name="count"/>
        <Tooltip
            crosshairs={{
              type: "y"
            }}
        />
        <Geom type="interval" position="age*count"/>
      </Chart>
  )
}
