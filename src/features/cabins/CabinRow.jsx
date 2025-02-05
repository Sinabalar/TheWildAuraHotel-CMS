import styled from "styled-components";

import {formatCurrency} from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import {useDeleteCabin} from "./useDeleteCabins.js";
import {HiOutlineSquare2Stack} from "react-icons/hi2";
import {HiOutlinePencil, HiOutlineTrash} from "react-icons/hi";
import {useCreateCabin} from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";


const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;


export default function CabinRow({cabin}) {

    const {deleteCabin, isDeleting} = useDeleteCabin()
    const {createCabin: duplicateCabin} = useCreateCabin()

    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image
    } = cabin


    function handleDuplicate() {
        duplicateCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            description,
            image
        })
    }


    return (
        <>
            <Table.Row>
                <Img src={image}/>
                <Cabin>{name}</Cabin>
                <div>{maxCapacity}</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount
                    ? <Discount>{formatCurrency(discount)}</Discount>
                    : <span>&mdash;</span>}
                <div>


                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={cabinId}/>

                            <Menus.List id={cabinId}>
                                <Menus.Button
                                    icon={<HiOutlineSquare2Stack/>}
                                    onClick={handleDuplicate}
                                >Duplicate
                                </Menus.Button>

                                <Modal.Open opens={"edit-cabin-form"}>
                                    <Menus.Button icon={<HiOutlinePencil/>}>Edit</Menus.Button>
                                </Modal.Open>

                                <Modal.Open opens={"cabin-delete-form"}>
                                    <Menus.Button icon={<HiOutlineTrash/>}>Delete</Menus.Button>
                                </Modal.Open>
                            </Menus.List>


                            <Modal.Window name={"edit-cabin-form"}>
                                <CreateCabinForm
                                    cabinToEdit={cabin}
                                />
                            </Modal.Window>

                            <Modal.Window name={"cabin-delete-form"}>
                                <ConfirmDelete
                                    resourceName={"cabin"}
                                    disabled={isDeleting}
                                    onConfirm={() => deleteCabin(cabinId)}
                                />
                            </Modal.Window>
                        </Menus.Menu>
                    </Modal>


                </div>
            </Table.Row>
        </>
    )
        ;
}
