import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { replaceBuilding } from '../store/actions/base';
import MenuItem from '../style/BuildingMenuItem';
import { findDOMNode } from 'react-dom';

class BuildingMenuItem extends Component {
    render() {
        const { img, type, connectDragSource } = this.props;

        return (
            <MenuItem ref={instance => connectDragSource(findDOMNode(instance))}>
                <img src={img} alt={type} />
                <div>{type}</div>
            </MenuItem>
        );
    }
}

const buildingSource = {
    beginDrag({ building }) {
        return { building };
    },
    endDrag({ replaceBuilding }, monitor) {
        if (!monitor.didDrop()) return;
        const from = monitor.getItem().building;
        const to = monitor.getDropResult().building;
        to.type = from.type;
        to.lvl = from.lvl;
        replaceBuilding(to);
    },
};

BuildingMenuItem = DragSource('building', buildingSource, connect => ({
    connectDragSource: connect.dragSource(),
}))(BuildingMenuItem);

const mapDispatchToProps = dispatch => {
    return {
        replaceBuilding: building => dispatch(replaceBuilding(building)),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(BuildingMenuItem);