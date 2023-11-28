import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import { execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import { Box, Button } from 'resource:///com/github/Aylur/ags/widget.js';

const Workspaces = () => {
    const workspacesHolder = Box({
        className: 'workspaces',
        connections: [
            [
                Hyprland,
                (widget) => {
                    const workspaces = Hyprland.workspaces;
                    const childrenList = [];
                    const currentWorkspace = Hyprland.active.workspace;
                    workspaces.forEach((ws) => {
                        const btn = Button({
                            className:
                                ws.id === currentWorkspace.id
                                    ? "focused"
                                    : "",
                            label: ws.id.toString(),
                            onClicked: () =>
                                execAsync([
                                    "hyprctl",
                                    "dispatch",
                                    "workspace",
                                    ws.id.toString(),
                                ]),
                        });
                        childrenList.push(btn);
                    });
                    childrenList.sort((a, b) => parseInt(a.label) - parseInt(b.label));
                    widget.children = childrenList;
                },
                "changed",
            ],
        ],
    });
    return workspacesHolder;
};

export default Workspaces;