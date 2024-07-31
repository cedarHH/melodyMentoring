import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ApiContext } from '../../contexts/ApiContext';
import Modal from 'react-modal';
import {
    GetAvatarReqParams,
    GetAvatarUploadUrlReqParams,
    GetSubUserByNameReqParams,
    UpdateAvatarSuccessReq,
    UpdateSubUserAttrReq
} from "../../contexts/api/usercenterComponents";

interface UserInfoProps {
    activeKid: string | null;
    setActiveKid: (kid: string) => void;
}

const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #1B1C1E;
    padding: 20px;
    border-radius: 10px;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    border: 2px solid #4B4B4B;
    position: relative;
`;

const Avatar = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    flex-shrink: 0;
    display: block;
    margin: 0 auto;
    position: relative;
    top: -10px;
`;

const InfoBlock = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 25px;
    margin-right: 25px;
    flex-grow: 1;
`;

const InfoColumn = styled.div<{ isRight?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: ${(props) => (props.isRight ? '0' : '30px')};
    margin-left: ${(props) => (props.isRight ? 'auto' : '0')};
    width: 40%;
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
    width: 110px; /* 增大标题宽度 */
    margin: 0;
`;

const InfoValue = styled.p<{ isRight?: boolean }>`
    font-size: 18px;
    font-family: 'Cambria', serif;
    margin: 0;
    margin-left: ${(props) => (props.isRight ? '10px' : '5px')}; /* 左边列和右边列的不同间距 */
`;

const EditButton = styled.button`
    background-color: #292A2C;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    position: absolute;
    font-weight: bold;
    font-style: italic;
    font-size: 18px;
    font-family: 'Cambria', serif;
    top: 5px;
    right: 10px;
    &:hover {
        background-color: #777;
    }

    @media (max-height: 824px) {
        font-size: 17px;
    }
    @media (max-width: 1380px) {
        font-size: 15px;
        padding: 4px 8px;
    }
    @media (max-width: 768px) {
        font-size: 17px;
        padding: 5px 10px;
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

const ProgressBar = styled.div`
    width: 80%;
    height: 20px;
    background-color: #333;
    border-radius: 5px;
    margin: 10px 0;
    overflow: hidden;
    position: relative;
`;

const Progress = styled.div<{ progress: number }>`
    height: 100%;
    background-color: #4caf50;
    width: ${(props) => props.progress}%;
    transition: width 0.4s ease-in-out;
`;

const UserInfo: React.FC<UserInfoProps> = ({ activeKid, setActiveKid }) => {
    const apiContext = useContext(ApiContext);
    const [isEditing, setIsEditing] = useState(false);
    const [profileName, setProfileName] = useState(activeKid || '');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [instrument, setInstrument] = useState('');
    const [badge, setBadge] = useState('')
    const [badges, setBadges] = useState<string[]>(['']);
    const [level, setLevel] = useState('');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    // Local state to hold the form data temporarily
    const [tempProfileName, setTempProfileName] = useState(activeKid || '');
    const [tempGender, setTempGender] = useState('');
    const [tempDob, setTempDob] = useState('');
    const [tempInstrument, setTempInstrument] = useState('');
    const [tempBadge, setTempBadge] = useState('');
    const [tempLevel, setTempLevel] = useState('');
    const [tempAvatar, setTempAvatar] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if(apiContext && activeKid){
                    const reqParams:GetSubUserByNameReqParams = {
                        profileName: activeKid
                    }
                    const response = await apiContext.user.getSubUserByName(reqParams)
                    if(response.code === 0){
                        const data = response.data;
                        setProfileName(data.profileName);
                        setGender(data.gender);
                        setDob(data.dob);
                        setInstrument(data.instrument);
                        setBadges(data.badges);
                        setBadge(data.badges && data.badges.length > 0 ? data.badges[0] : ''); // 从 badges 数组中提取 badge
                        setLevel(data.level);

                        const getAvatarReq: GetAvatarReqParams = {
                            profileName: activeKid
                        }
                        const avatarResp = await apiContext.user.getAvatar(getAvatarReq)
                        if(avatarResp.code === 0) {
                            setAvatar(avatarResp.presignedurl);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData().then(r => {});
    }, [activeKid, apiContext]);

    useEffect(() => {
        // Initialize the temp states when the user data is fetched
        setTempProfileName(profileName);
        setTempGender(gender);
        setTempDob(dob);
        setTempInstrument(instrument);
        setTempBadge(badge); // 添加这行
        setTempLevel(level);
        setTempAvatar(avatar);
    }, [profileName, gender, dob, instrument, badge, level, avatar]);

    const handleSave = async () => {
        try {
            const updateSubUserAttrReq: UpdateSubUserAttrReq = {
                profileName: tempProfileName,
                gender: tempGender,
                dob: tempDob,
                level: tempLevel,
                instrument: tempInstrument,
                badge: tempBadge, // 使用 badge
            };
            if(apiContext){
                const response = await apiContext.user.updateSubUserAttr(updateSubUserAttrReq);
                if(response.code === 0){
                    // Update the main states after saving to the database
                    setProfileName(tempProfileName);
                    setGender(tempGender);
                    setDob(tempDob);
                    setInstrument(tempInstrument);
                    setBadge(tempBadge); // 更新主状态
                    setLevel(tempLevel);
                    setAvatar(tempAvatar);
                    setIsEditing(false);
                    setActiveKid(tempProfileName); // Update activeKid in Sidebar
                }
            }
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                if(apiContext) {
                    const getAvatarUploadUrlReq: GetAvatarUploadUrlReqParams = {
                        profileName: tempProfileName
                    }
                    const response = await apiContext.user.getAvatarUploadUrl(getAvatarUploadUrlReq);
                    if(response.code === 0) {
                        const file = e.target.files[0];
                        const xhr = new XMLHttpRequest();
                        xhr.open('PUT', response.data.presignedurl, true);
                        xhr.setRequestHeader('Content-Type', file.type);

                        xhr.upload.onprogress = (event) => {
                            if (event.lengthComputable) {
                                const percentComplete = (event.loaded / event.total) * 100;
                                setUploadProgress(percentComplete);
                            }
                        };

                        xhr.onload = async () => {
                            if (xhr.status === 200) {
                                const updateAvatarSuccessReq: UpdateAvatarSuccessReq = {
                                    profileName: tempProfileName,
                                    fileName: response.data.fileName
                                }
                                const response1 = await apiContext.user.updateAvatarSuccess(updateAvatarSuccessReq)
                                if(response1.code === 0) {
                                    const getAvatarReq: GetAvatarReqParams = {
                                        profileName: tempProfileName
                                    }
                                    const response2 = await apiContext.user.getAvatar(getAvatarReq)
                                    if(response2.code === 0) {
                                        setTempAvatar(response2.presignedurl); // Only update the temp avatar for the current profile
                                        setUploadProgress(0);
                                        setIsUploading(false);
                                    }
                                }
                            } else {
                                console.error('Avatar upload failed', xhr.statusText);
                                setUploadProgress(0);
                                setIsUploading(false);
                            }
                        };

                        xhr.onerror = () => {
                            console.error('Avatar upload failed', xhr.statusText);
                            setUploadProgress(0);
                            setIsUploading(false);
                        };

                        setIsUploading(true);
                        xhr.send(file);
                    }
                }
            } catch (error) {
                console.error('Avatar upload failed', error);
            }
        }
    };

    const handleCancel = () => {
        // Reset the temp states when cancelling
        setTempProfileName(profileName);
        setTempGender(gender);
        setTempDob(dob);
        setTempInstrument(instrument);
        setTempBadge(badge); // 添加这行
        setTempLevel(level);
        setTempAvatar(avatar);
        setIsEditing(false);
    };

    return (
        <>
            <UserInfoContainer>
                <Avatar src={avatar || undefined} alt="Kid Avatar" />
                <InfoBlock>
                    <InfoColumn>
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
                    </InfoColumn>
                    <InfoColumn isRight>
                        <InfoRow>
                            <InfoLabel>Birthday:</InfoLabel>
                            <InfoValue isRight>{dob}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Instrument:</InfoLabel>
                            <InfoValue isRight>{instrument}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Badge:</InfoLabel>
                            <InfoValue isRight>{badge}</InfoValue>
                        </InfoRow>
                    </InfoColumn>
                </InfoBlock>
                {activeKid && <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>}
            </UserInfoContainer>
            {isEditing && (
                <ModalOverlay>
                    <EditModal>
                        <h3>Edit User Info</h3>
                        <Input
                            type="text"
                            placeholder="Name"
                            value={tempProfileName}
                            onChange={(e) => setTempProfileName(e.target.value)}
                        />
                        <Select value={tempGender} onChange={(e) => setTempGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Select>
                        <Select value={tempLevel} onChange={(e) => setTempLevel(e.target.value)}>
                            <option value="">Select Level</option>
                            <option value="1">Beginner</option>
                            <option value="2">Elementary</option>
                            <option value="3">Intermediate</option>
                            <option value="4">Advanced</option>
                            <option value="5">Expert</option>
                        </Select>
                        <Input
                            type="date"
                            value={tempDob}
                            onChange={(e) => setTempDob(e.target.value)}
                        />
                        <Select value={tempInstrument} onChange={(e) => setTempInstrument(e.target.value)}>
                            <option value="">Select Instrument</option>
                            <option value="Piano">Piano</option>
                            <option value="Violin">Violin</option>
                            <option value="Guitar">Guitar</option>
                            <option value="Drums">Drums</option>
                            <option value="Flute">Flute</option>
                            <option value="Saxophone">Saxophone</option>
                            <option value="Trumpet">Trumpet</option>
                            <option value="Cello">Cello</option>
                            <option value="Clarinet">Clarinet</option>
                        </Select>
                        <Input
                            type="text"
                            placeholder="Badge"
                            value={tempBadge}
                            onChange={(e) => setTempBadge(e.target.value)}
                        />
                        <Input type="file" accept="image/*" onChange={handleAvatarChange} />
                        {isUploading && <ProgressBar><Progress progress={uploadProgress} /></ProgressBar>}
                        <ModalActions>
                            <ModalButton onClick={handleSave}>Save</ModalButton>
                            <ModalButton onClick={handleCancel}>Cancel</ModalButton>
                        </ModalActions>
                    </EditModal>
                </ModalOverlay>
            )}
        </>
    );
};

export default UserInfo;
