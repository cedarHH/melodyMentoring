import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ApiContext } from '../../contexts/ApiContext';
import Modal from 'react-modal';
import axios from 'axios';
import defaultAvatar from '../../assets/img/home/kid-avatar.jpg';
import {
    GetSubUserByNameReqParams,
    UpdateSubUserAttrReq
} from "../../contexts/api/usercenterComponents"; // 确保正确导入默认头像

interface UserInfoProps {
    activeKid: string;
    setActiveKid: (kid: string) => void;
}

const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #1B1C1E;
    padding: 20px;
    border-radius: 10px;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    border: 2px solid #4B4B4B;
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25px;
  flex-grow: 1;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const InfoLabel = styled.p`
    font-weight: bold;
    font-size: 18px;
    font-family: 'Cambria', serif;
    width: 80px;
    margin: 0;
`;

const InfoValue = styled.p`
    font-size: 18px;
    font-family: 'Cambria', serif;
    margin: 0;
`;

const EditButton = styled.button`
    background-color: transparent;
    border: none;
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
    margin-left: auto;
    &:hover {
        color: #aaaaaa;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const EditModal = styled.div`
    background: #222222;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 430px;
    max-height: 550px;
    border: 4px solid #555555;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    
    @media (min-width: 768px) {
        width: 30%;
        height: 80%;
    }
`;

const Input = styled.input`
    width: 80%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #444;
    background-color: #333;
    color: #fff;
    font-size: 16px;
    margin: 10px 0;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        outline: none;
        border-color: #777;
    }

    @media (max-width: 768px) {
        padding: 5px;
    }
`;

const Select = styled.select`
    width: 80%;
    padding: 8px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #444;
    background-color: #333;
    color: #fff;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: #777;
    }

    @media (max-width: 768px) {
        width: 90%;
        padding: 5px;
    }
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
    gap: 30px;

    @media (min-width: 768px) {
        gap: 70px;
    }
`;

const ModalButton = styled.button`
    padding: 10px 20px;
    background-color: #444;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        background-color: #777;
    }
    
    @media (max-width: 768px) {
        padding: 8px 12px;
        font-size: 15px;
    }
`;

const UserInfo: React.FC<UserInfoProps> = ({ activeKid, setActiveKid }) => {
    const apiContext = useContext(ApiContext);
    const [isEditing, setIsEditing] = useState(false);
    const [profileName, setProfileName] = useState(activeKid);
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [instrument, setInstrument] = useState('');
    const [badge, setBadge] = useState('')
    const [badges, setBadges] = useState<string[]>(['']);
    const [level, setLevel] = useState('');
    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if(apiContext){
                    const reqParams:GetSubUserByNameReqParams = {
                        profileName: activeKid
                    }
                    const response = await apiContext.getSubUserByName(reqParams)
                    if(response.code === 0){
                        const data = response.data;
                        setProfileName(data.profileName);
                        setGender(data.gender);
                        setDob(data.dob);
                        setInstrument(data.instrument);
                        setBadges(data.badges);
                        setLevel(data.level);
                        setAvatar(data.avatar);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData().then(r => {});
    }, [activeKid]);

    const handleSave = async () => {
        try {
            const updateSubUserAttrReq:UpdateSubUserAttrReq = {
                profileName: profileName,
                gender: gender,
                dob: dob,
                level: level,
                instrument: instrument,
            };
            if(apiContext){
                const response = await apiContext.updateSubUserAttr(updateSubUserAttrReq)
                if(response.code === 0){
                    setIsEditing(false);
                    setActiveKid(profileName); // Update activeKid in Sidebar
                }
            }
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.result) {
                    setAvatar(fileReader.result as string);
                }
            };
            fileReader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <>
            <UserInfoContainer>
                <Avatar src={avatar || defaultAvatar} alt="Kid Avatar" />
                <InfoBlock>
                    <InfoRow>
                        <InfoLabel>Name:</InfoLabel>
                        <InfoValue>{profileName}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>Gender:</InfoLabel>
                        <InfoValue>{gender}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>Level:</InfoLabel>
                        <InfoValue>{level}</InfoValue>
                    </InfoRow>
                </InfoBlock>
                <InfoBlock>
                    <InfoRow>
                        <InfoLabel>Birthday:</InfoLabel>
                        <InfoValue>{dob}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>Instrument:</InfoLabel>
                        <InfoValue>{instrument}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>Badge:</InfoLabel>
                        <InfoValue>{badge}</InfoValue>
                    </InfoRow>
                </InfoBlock>
                <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
            </UserInfoContainer>
            {isEditing && (
                <ModalOverlay>
                    <EditModal>
                        <h3>Edit User Info</h3>
                        <Input
                            type="text"
                            placeholder="Name"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                        />
                        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Select>
                        <Select value={level} onChange={(e) => setLevel(e.target.value)}>
                            <option value="">Select Level</option>
                            <option value="1">Beginner</option>
                            <option value="2">Elementary</option>
                            <option value="3">Intermediate</option>
                            <option value="4">Advanced</option>
                            <option value="5">Expert</option>
                        </Select>
                        <Input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                        <Select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
                            <option value="Piano">Piano</option>
                        </Select>
                        <Input
                            type="text"
                            placeholder="Badge"
                            value={badge}
                            onChange={(e) => setBadge(e.target.value)}
                        />
                        <Input type="file" accept="image/*" onChange={handleAvatarChange} />
                        <ModalActions>
                            <ModalButton onClick={handleSave}>Save</ModalButton>
                            <ModalButton onClick={() => setIsEditing(false)}>Cancel</ModalButton>
                        </ModalActions>
                    </EditModal>
                </ModalOverlay>
            )}
        </>
    );
};

export default UserInfo;
