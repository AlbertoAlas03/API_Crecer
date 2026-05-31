import { Children } from '../models/Children.js'
import CONSTANTS_TEXT from '../config/constants.js'

export const add_basic_data = async (req, res) => {
    try {
        const { _id, basic_data } = req.body

        if (!basic_data) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const children = await Children.findOne({
            _id: _id
        })

        await children.updateOne({
            $push: { basic_data: basic_data }
        });

        return res.status(200).json({
            message: CONSTANTS_TEXT.basic_data_added
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const add_allergies = async (req, res) => {
    try {
        const { _id, allergies } = req.body

        if (!allergies) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const children = await Children.findOne({
            _id: _id
        })

        await children.updateOne({
            $push: { allergies: allergies }
        });

        return res.status(200).json({
            message: CONSTANTS_TEXT.allergies_added
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const add_conditions = async (req, res) => {
    try {
        const { _id, conditions } = req.body

        if (!conditions) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const children = await Children.findOne({
            _id: _id
        })

        await children.updateOne({
            $push: { conditions: conditions }
        });

        return res.status(200).json({
            message: CONSTANTS_TEXT.conditions_added
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const add_medications = async (req, res) => {
    try {
        const { _id, medications } = req.body

        if (!medications) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const children = await Children.findOne({
            _id: _id
        })

        await children.updateOne({
            $push: { medications: medications }
        });

        return res.status(200).json({
            message: CONSTANTS_TEXT.medications_added
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const add_professional_preferred = async (req, res) => {
    try {
        const { _id, professional_preferred } = req.body

        if (!professional_preferred) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const children = await Children.findOne({
            _id: _id
        })

        await children.updateOne({
            $push: { professional_preferred: professional_preferred }
        });

        return res.status(200).json({
            message: CONSTANTS_TEXT.professional_preferred_added
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const delete_item = async (req, res) => {
    try {
        const { _id, field, value } = req.body

        if (!_id || !field || !value) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const children = await Children.findByIdAndUpdate(
            _id,
            { $pull: { [field]: value } }
        )

        if (!children) {
            return res.status(404).json({
                message: CONSTANTS_TEXT.error_item_deleted
            })
        }

        return res.status(200).json({
            message: CONSTANTS_TEXT.item_deleted
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const update_item = async (req, res) => {
    try {
        const { _id, field, previous_value, new_value } = req.body

        if (!_id || !field || !previous_value || !new_value) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const children = await Children.findById(_id)

        const index = children[field].indexOf(previous_value);

        const update = await Children.findByIdAndUpdate(
            _id,
            { $set: { [`${field}.${index}`]: new_value } }
        );

        if (!update) {
            return res.status(404).json({
                message: CONSTANTS_TEXT.error_item_updated
            })
        }

        return res.status(200).json({
            message: CONSTANTS_TEXT.item_updated
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}