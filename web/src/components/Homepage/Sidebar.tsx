import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ApiContext } from '../../contexts/ApiContext';
import {CreateSubUserReq, DeleteSubUserByNameReq, SubUser} from "../../contexts/api/usercenterComponents";

interface SidebarProps {
    activeKid: string;
    setActiveKid: (kid: string) => void;
}

const Aside = styled.aside`
  width: 100%;
  background-color: #222222;
  padding: 20px;
  box-sizing: border-box;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

interface ListItemProps {
    $isActive: boolean;
}

const ListItem = styled.li<ListItemProps>`
    font-weight: bold;
    font-family: 'Cambria', serif;
    padding: 10px;
    cursor: pointer;
    background-color: ${(props) => (props.$isActive ? '#3a3a3a' : 'transparent')};
    border-radius: ${(props) => (props.$isActive ? '5px' : '0')};
    font-size: ${(props) => (props.$isActive ? '18px' : '16px')}; 
    color: ${(props) => (props.$isActive ? '#ffffff' : '#aaaaaa')};
    
    &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    }
`;

const AddButton = styled.button`
    background-color: transparent;
    border: none;
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;

    margin-top: 10px;

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

const AddKidModal = styled.div`
    background: #222222;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 430px;
    max-height: 260px;
    border: 4px solid #555555;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    
    @media (min-width: 768px) {
        width: 30%;
        height: 40%;
    }
`;

const AddKidModalTitle = styled.h3`
    margin-top: -5px;
    padding: 5px;
    font-family: Cambria, sans-serif;
    font-weight: bold;
    font-size: 20px;
    color: #ffffff;
    
    @media (min-width: 768px) {
        font-size: 25px;
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

const Sidebar: React.FC<SidebarProps> = ({ activeKid, setActiveKid }) => {
    const apiContext = useContext(ApiContext);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newKidName, setNewKidName] = useState('');
    const [newKidPin, setNewKidPin] = useState('');
    const [selectedKid, setSelectedKid] = useState('');
    const [deleteKidPin, setDeleteKidPin] = useState('');
    const [showPin, setShowPin] = useState(false);
    const [subUsers, setSubUsers] = useState([''])

    useEffect(() => {
        if (isAddModalOpen || isDeleteModalOpen) {
            setNewKidName('');
            setNewKidPin('');
            setSelectedKid('');
            setDeleteKidPin('');
        }
    }, [isAddModalOpen, isDeleteModalOpen]);

    useEffect(() => {
        const fetchUsers = async () => {
            if (apiContext) {
                const response = await apiContext.getSubUsers()
                if (response.code === 0) {
                    const profileNames = response.data.map(
                        (subUser: SubUser) => subUser.profileName);
                    setSubUsers(profileNames);
                }
            }
        }
        fetchUsers().then()
    }, []);

    const handleAddKid = async (event: React.FormEvent) => {
        event.preventDefault();
        if (newKidName && newKidPin && apiContext) {
            const createSubUserReq: CreateSubUserReq = {
                profileName:newKidName,
                pin:newKidPin
            }
            const response = await apiContext.createSubUser(createSubUserReq)
            if(response.code === 0) {
                setNewKidName('');
                setNewKidPin('');
                setIsAddModalOpen(false);
            }
        }
    };

    const handleDeleteKid = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedKid && deleteKidPin && apiContext) {
            const deleteSubUserByName: DeleteSubUserByNameReq = {
                profileName: selectedKid,
                pin: deleteKidPin
            }
            const response = await apiContext.deleteSubUserByName(deleteSubUserByName)
            if(response.code === 0) {
                setSelectedKid('');
                setDeleteKidPin('');
                setIsDeleteModalOpen(false);
            }
        }
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const toggleShowPin = () => {
        setShowPin((prev) => !prev);
    };

    return (
        <>
            <List>
                {subUsers.map((kid: string) => (
                    <ListItem
                        key={kid}
                        $isActive={activeKid === kid}
                        onClick={() => setActiveKid(kid)}
                    >
                        {kid}
                    </ListItem>
                ))}
            </List>
            <AddButton onClick={openAddModal}>+</AddButton>
            <br />
            <AddButton onClick={openDeleteModal}>-</AddButton>
            {isAddModalOpen && (
                <ModalOverlay>
                    <AddKidModal>
                        <AddKidModalTitle>Create a new kid account</AddKidModalTitle>
                        <form onSubmit={handleAddKid}>
                            <Input
                                type="text"
                                placeholder="Name"
                                value={newKidName}
                                onChange={(e) => setNewKidName(e.target.value)}
                                autoComplete="off"
                            />
                            <Input
                                type={showPin ? "text" : "password"}
                                placeholder="PIN"
                                value={newKidPin}
                                onChange={(e) => setNewKidPin(e.target.value)}
                                autoComplete="new-password"
                            />
                            <ModalActions>
                                <ModalButton type="submit">Confirm</ModalButton>
                                <ModalButton type="button" onClick={closeAddModal}>Cancel</ModalButton>
                            </ModalActions>
                        </form>
                    </AddKidModal>
                </ModalOverlay>
            )}
            {isDeleteModalOpen && (
                <ModalOverlay>
                    <AddKidModal>
                        <AddKidModalTitle>Delete a kid account</AddKidModalTitle>
                        <form onSubmit={handleDeleteKid}>
                            <Select
                                value={selectedKid}
                                onChange={(e) => setSelectedKid(e.target.value)}
                            >
                                <option value="">Select a kid</option>
                                {subUsers.map((kid: string) => (
                                    <option key={kid} value={kid}>
                                        {kid}
                                    </option>
                                ))}
                            </Select>
                            <Input
                                type={showPin ? "text" : "password"}
                                placeholder="PIN"
                                value={deleteKidPin}
                                onChange={(e) => setDeleteKidPin(e.target.value)}
                                autoComplete="new-password"
                            />
                            <ModalActions>
                                <ModalButton type="submit">Confirm</ModalButton>
                                <ModalButton type="button" onClick={closeDeleteModal}>Cancel</ModalButton>
                            </ModalActions>
                        </form>
                    </AddKidModal>
                </ModalOverlay>
            )}
        </>
    );
};

export default Sidebar;
