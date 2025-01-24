import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Group, User } from '../types';

interface GroupManagementProps {
    group: Group;
    onUpdateBulletin: (bulletin: string) => void;
    onInviteMembers: (invitees: string[]) => void;
    onRemoveMember: (userId: string) => void;
}

const GroupManagement: React.FC<GroupManagementProps> = ({
    group,
    onUpdateBulletin,
    onInviteMembers,
    onRemoveMember
}) => {
    const [bulletin, setBulletin] = useState(group.bulletin);
    const [inviteInput, setInviteInput] = useState('');

    const handleInvite = () => {
        const invitees = inviteInput.split(',').map(invite => invite.trim());
        onInviteMembers(invitees);
        setInviteInput('');
    };

    return (
        <div style={{ marginBottom: 16 }}>
            <Typography variant="h6">群組佈告欄</Typography>
            <TextField
                fullWidth
                value={bulletin}
                onChange={(e) => setBulletin(e.target.value)}
                placeholder="輸入群組佈告欄訊息"
                variant="outlined"
                margin="normal"
            />
            <Button
                variant="contained"
                onClick={() => onUpdateBulletin(bulletin)}
            >
                更新佈告欄
            </Button>

            <Typography variant="h6" style={{ marginTop: 16 }}>邀請成員</Typography>
            <TextField
                fullWidth
                value={inviteInput}
                onChange={(e) => setInviteInput(e.target.value)}
                placeholder="輸入Line ID或email，用逗號分隔"
                variant="outlined"
                margin="normal"
            />
            <Button
                variant="contained"
                onClick={handleInvite}
            >
                發送邀請
            </Button>

            <Typography variant="h6" style={{ marginTop: 16 }}>群組成員</Typography>
            <List>
                {group.members.map(member => (
                    <ListItem
                        key={member.id}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                onClick={() => onRemoveMember(member.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={member.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default GroupManagement;