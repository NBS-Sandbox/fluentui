import * as React from 'react';
import {
  IVSChartDataPoint,
  IVerticalStackedChartProps,
  VerticalStackedBarChart,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { Checkbox, ChoiceGroup, IChoiceGroupOption, Label, Stack, TextField } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';

const options: IChoiceGroupOption[] = [
  { key: 'WrapTickValues', text: 'Wrap X Axis Ticks' },
  { key: 'showTooltip', text: 'Show Tooltip at X axis ticks' },
];

interface IVerticalStackedBarState {
  selectedCallout: string;
  barWidthEnabled: boolean;
  xAxisInnerPaddingEnabled: boolean;
  xAxisOuterPaddingEnabled: boolean;
  barWidth: number;
  maxBarWidth: number;
  xAxisInnerPadding: number;
  xAxisOuterPadding: number;
  width: number;
  height: number;
  enableGradient: boolean;
  roundCorners: boolean;
  barGapMax: number;
}

export class VerticalStackedBarChartTooltipExample extends React.Component<{}, IVerticalStackedBarState> {
  constructor(props: IVerticalStackedChartProps) {
    super(props);
    this.state = {
      selectedCallout: 'showTooltip',
      barWidthEnabled: true,
      xAxisInnerPaddingEnabled: false,
      xAxisOuterPaddingEnabled: false,
      barWidth: 16,
      maxBarWidth: 100,
      xAxisInnerPadding: 0.67,
      xAxisOuterPadding: 0,
      width: 650,
      height: 350,
      enableGradient: false,
      roundCorners: false,
      barGapMax: 2,
    };
  }
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onBarWidthCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ barWidthEnabled: checked });
  };
  private _onBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ barWidth: Number(newValue) });
  };
  private _onMaxBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ maxBarWidth: Number(newValue) });
  };
  private _onInnerPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ xAxisInnerPaddingEnabled: checked });
  };
  private _onInnerPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ xAxisInnerPadding: Number(e.target.value) });
  };
  private _onOuterPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ xAxisOuterPaddingEnabled: checked });
  };
  private _onOuterPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ xAxisOuterPadding: Number(e.target.value) });
  };
  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: Number(e.target.value) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: Number(e.target.value) });
  };

  private _onToggleGradient = (e: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundedCorners = (e: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  };

  private _basicExample(): JSX.Element {
    const firstChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 2, color: getColorFromToken(DataVizPalette.color1) },
      { legend: 'Metadata2', data: 0.5, color: getColorFromToken(DataVizPalette.color2) },
      { legend: 'Metadata3', data: 0, color: getColorFromToken(DataVizPalette.color6) },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 30, color: getColorFromToken(DataVizPalette.color1) },
      { legend: 'Metadata2', data: 3, color: getColorFromToken(DataVizPalette.color2) },
      { legend: 'Metadata3', data: 40, color: getColorFromToken(DataVizPalette.color6) },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 10, color: getColorFromToken(DataVizPalette.color1) },
      { legend: 'Metadata2', data: 60, color: getColorFromToken(DataVizPalette.color2) },
      { legend: 'Metadata3', data: 30, color: getColorFromToken(DataVizPalette.color6) },
    ];

    const data: IVerticalStackedChartProps[] = [
      { chartData: firstChartPoints, xAxisPoint: 'Simple Data' },
      { chartData: secondChartPoints, xAxisPoint: 'Long text will disaply all text' },
      { chartData: thirdChartPoints, xAxisPoint: 'Data' },
      { chartData: firstChartPoints, xAxisPoint: 'Meta data' },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    return (
      <div className="containerDiv">
        <Stack horizontal wrap tokens={{ childrenGap: 30 }}>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor="input-width" style={{ fontWeight: 400 }}>
              width:&nbsp;
            </Label>
            <input
              type="range"
              value={this.state.width}
              min={200}
              max={1000}
              onChange={this._onWidthChange}
              id="input-width"
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor="input-height" style={{ fontWeight: 400 }}>
              height:&nbsp;
            </Label>
            <input
              type="range"
              value={this.state.height}
              min={200}
              max={1000}
              id="input-height"
              onChange={this._onHeightChange}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="barWidth:&nbsp;"
              checked={this.state.barWidthEnabled}
              onChange={this._onBarWidthCheckChange}
            />
            {this.state.barWidthEnabled ? (
              <TextField
                type="number"
                value={this.state.barWidth.toString()}
                min={1}
                max={300}
                onChange={this._onBarWidthChange}
                disabled={!this.state.barWidthEnabled}
              />
            ) : (
              <code>'auto'</code>
            )}
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor="input-maxbarwidth" style={{ fontWeight: 400 }}>
              maxBarWidth:&nbsp;
            </Label>
            <TextField
              type="number"
              value={this.state.maxBarWidth.toString()}
              min={1}
              max={300}
              id="input-maxbarwidth"
              onChange={this._onMaxBarWidthChange}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="xAxisInnerPadding:&nbsp;"
              checked={this.state.xAxisInnerPaddingEnabled}
              onChange={this._onInnerPaddingCheckChange}
            />
            <input
              type="range"
              value={this.state.xAxisInnerPadding}
              min={0}
              max={1}
              step={0.01}
              onChange={this._onInnerPaddingChange}
              disabled={!this.state.xAxisInnerPaddingEnabled}
            />
            <span>&nbsp;{this.state.xAxisInnerPadding}</span>
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="xAxisOuterPadding:&nbsp;"
              checked={this.state.xAxisOuterPaddingEnabled}
              onChange={this._onOuterPaddingCheckChange}
            />
            <input
              type="range"
              value={this.state.xAxisOuterPadding}
              min={0}
              max={1}
              step={0.01}
              onChange={this._onOuterPaddingChange}
              disabled={!this.state.xAxisOuterPaddingEnabled}
            />
            <span>&nbsp;{this.state.xAxisOuterPadding}</span>
          </Stack>
        </Stack>
        <Stack horizontal>
          <ChoiceGroup
            options={options}
            defaultSelectedKey="showTooltip"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(_ev, option) => option && this.setState({ selectedCallout: option.key })}
            label="Pick one"
          />
          &nbsp;&nbsp;
          <Toggle label="Enable Gradient" onText="ON" offText="OFF" onChange={this._onToggleGradient} />
          &nbsp;&nbsp;
          <Toggle label="Rounded Corners" onText="ON" offText="OFF" onChange={this._onToggleRoundedCorners} />
        </Stack>

        <div style={rootStyle}>
          <VerticalStackedBarChart
            chartTitle="Vertical stacked bar chart axis tooltip example"
            data={data}
            height={this.state.height}
            width={this.state.width}
            showXAxisLablesTooltip={this.state.selectedCallout === 'showTooltip' ? true : false}
            wrapXAxisLables={this.state.selectedCallout === 'WrapTickValues' ? true : false}
            enableReflow={true}
            barWidth={this.state.barWidthEnabled ? this.state.barWidth : 'auto'}
            maxBarWidth={this.state.maxBarWidth}
            xAxisInnerPadding={this.state.xAxisInnerPaddingEnabled ? this.state.xAxisInnerPadding : undefined}
            xAxisOuterPadding={this.state.xAxisOuterPaddingEnabled ? this.state.xAxisOuterPadding : undefined}
            enableGradient={this.state.enableGradient}
            roundCorners={this.state.roundCorners}
            barGapMax={this.state.barGapMax}
          />
        </div>
      </div>
    );
  }
}
