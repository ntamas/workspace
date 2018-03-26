// tslint:disable:no-shadowed-variable

import * as PropTypes from "prop-types";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Container, IPerspectiveStorage, ItemConfigType, Module, ModuleDrawer,
         ModuleTray, PerspectiveBar, PerspectiveBuilder, PerspectiveStorage,
         Workbench, WorkbenchBuilder, WorkbenchView } from "../../src/index";

require("../../themes/blue.css");

// =============================================================================

interface IMyComponentProps {
  label: string;
}

interface IMyComponentState {
  counter: number;
}

const MyComponent = ({ label }: IMyComponentProps) => (
  <div className="panel">
    <div className="big-letter">{ label }</div>
  </div>
);

class MyComponentClass extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    this._onClick = this._onClick.bind(this);
  }

  public render() {
    return (
      <div className="panel" onClick={this._onClick} style={{ cursor: "pointer" }}>
        <div className="big-letter">{ this.props.label }{ this.state.counter }</div>
      </div>
    );
  }

  private _onClick() {
    this.setState({
      counter: (this.state.counter + 1) % 10
    });
  }
}

// =============================================================================

interface IHeaderProps {
  perspectives: IPerspectiveStorage;
  workbench: Workbench;
}

const Header = ({ perspectives, workbench }: IHeaderProps) => (
  <div id="header" style={{ display: "flex", alignItems: "center" }}>
    <div className="title">Workbench demo</div>
    <PerspectiveBar storage={perspectives} workbench={workbench} />
  </div>
);

// =============================================================================

interface IFooterProps {
  workbench: Workbench;
}

const Footer = ({ workbench }: IFooterProps) => (
  <div id="footer">
    <ModuleTray workbench={workbench}>
      <ModuleDrawer label="Generic">
        <Module id="panel-a" label="Panel A" component={MyComponent} props={{ label: "A" }} />
        <Module id="panel-b" label="Panel B" component={MyComponent} props={{ label: "B" }} />
        <Module id="panel-c" label="Panel C" component={MyComponent} props={{ label: "C" }} />
        <Module id="panel-d" label="Panel D" component={MyComponent} props={{ label: "D" }} />
      </ModuleDrawer>
      <ModuleDrawer label="Forecast">
      </ModuleDrawer>
      <ModuleDrawer label="Safety stock">
      </ModuleDrawer>
      <ModuleDrawer label="Import">
      </ModuleDrawer>
      <ModuleDrawer label="Master tables">
      </ModuleDrawer>
    </ModuleTray>
  </div>
);

// =============================================================================

const workbench = new WorkbenchBuilder()
  .makeRows()
    .add(MyComponent, {
      props: { label: "A" },
      title: "Panel A",
    }, "panel-a")
    .setRelativeHeight(66)
    .makeColumns()
      .makeStack()
        .add(MyComponent, {
          props: { label: "B" },
          title: "Panel B",
        }, "panel-b")
        .add(MyComponentClass, {
          props: { label: "C" },
          title: "Panel C",
        }, "panel-c")
      .finish()
      .add(MyComponentClass, {
        props: { label: "D" },
        title: "Panel D",
      }, "panel-d")
  .build();

const perspectives = PerspectiveStorage.fromArray([
  {
    label: "P1",
    state: {
      content:
        new PerspectiveBuilder(workbench)
          .makeRows()
            .add(MyComponent, {
              props: { label: "A" },
              title: "Panel A"
            }, "panel-a")
            .add(MyComponent, {
              props: { label: "B" },
              title: "Panel B"
            }, "panel-b")
          .build()
    }
  },
  {
    label: "P2",
    state: {
      content:
        new PerspectiveBuilder(workbench)
          .makeColumns()
            .add(MyComponent, {
              props: { label: "A" },
              title: "Panel A"
            }, "panel-a")
            .add(MyComponent, {
              props: { label: "B" },
              title: "Panel B"
            }, "panel-b")
          .build()
    }
  }
]);

// =============================================================================

const App = () => (
  <div id="app">
    <Header perspectives={perspectives} workbench={workbench} />
    <WorkbenchView id="root" workbench={workbench} />
    <Footer workbench={workbench} />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app-container"));
