import { Children } from '../models/Children.js'
import { Users } from '../models/Users.js'
import CONSTANTS_TEXT from '../config/constants.js'
import { validationDUI } from '../utils/validation.js'

export const add_children = async (req, res) => {
    try {
        const { code, DUI } = req.body

        if (!code) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_NUI_NIE
            })
        } else if (!validationDUI(code)) {
            return res.status(404).json({
                message: CONSTANTS_TEXT.invalid_NUI_NIE
            })
        }

        const user = await Users.findOne({
            DUI: DUI
        })

        if (!user) {

            return res.status(404).json({
                message: CONSTANTS_TEXT.user_not_found
            })
        }

        const data_Children = await Children.findOne({
            code: code
        }).select('-code');

        if (!data_Children) {
            return res.status(404).json({
                message: CONSTANTS_TEXT.child_not_found
            })
        }

        const exists = user.children.includes(data_Children._id);

        if (exists) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.child_exists
            });
        }

        await user.updateOne({
            $push: { children: data_Children._id }
        });

        return res.status(200).json({
            message: CONSTANTS_TEXT.child_registered,
            data: data_Children
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const delete_children = async (req, res) => {
    try {
        const { _id, _id_children } = req.body

        const user = await Users.findByIdAndUpdate(
            _id,
            { $pull: { children: _id_children } },
        )

        if (!user) {
            return res.status(404).json({
                message: CONSTANTS_TEXT.error_item_deleted
            })
        }

        return res.status(200).json({
            message: CONSTANTS_TEXT.child_deleted
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const register_children = async (req, res) => {
    try {
        const { code, name, birthDate, gender } = req.body

        if (!code || !name || !birthDate || !gender) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const newChildren = new Children({
            code: code,
            name: name,
            birthDate: birthDate,
            gender: gender
        })

        await newChildren.save()

        return res.status(200).json({
            message: CONSTANTS_TEXT.child_registered
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}