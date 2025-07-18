import { Box } from "@mui/material";

interface CritterOptionProps {
    imageUrl?: string;
    name: string;
    imageSize?: number;
}

const CritterOption = ({
                           imageUrl,
                           name,
                           imageSize = 32,
                       }: CritterOptionProps) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={name}
                    style={{
                        width: imageSize,
                        height: imageSize,
                        objectFit: 'cover',
                        borderRadius: '4px'
                    }}
                    loading={"lazy"}
                />
            )}
            <Box>{name}</Box>

        </Box>
    );
};

export default CritterOption;
