import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import { execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import { Box, Button, Label } from 'resource:///com/github/Aylur/ags/widget.js';

export const DynamicWorkspaces = () => {
    const workspacesHolder = Box({
        className: 'workspaces-dynamic'
    }).hook(Hyprland, (widget) => {
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
    });
    return workspacesHolder;
};

const Buttons = () => Array.from({ length: 10 }, (_, i) => Button({
    child: Label(''),
    vpack: 'center',
    hpack: 'center',
}).hook(Hyprland, self => {
    const currentWorkspace = Hyprland.active.workspace;
    const workspaces = Hyprland.workspaces.map(ws => ws.id);
    self.className = (i+1) === currentWorkspace.id ? "focused" : (workspaces.includes(i+1) ? "active" : "");
    self.onClicked = () => execAsync([
        "hyprctl",
        "dispatch",
        "workspace",
        `${i+1}`,]);

    self.child.css = (i+1) === currentWorkspace.id ? "min-width: 20px;" : "min-width: 1px;";
    })
)

export const Workspaces = () => {
    const workspacesHolder = Box({
        className: 'workspaces',
        children: Buttons(),
    });
    return workspacesHolder;
};
