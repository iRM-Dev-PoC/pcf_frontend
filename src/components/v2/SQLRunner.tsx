import { Button } from "@ui5/webcomponents-react";
import { Play } from "lucide-react";

const SQLRunner = ({ sql }: { sql: string }) => {
    const handleSqlRunner = () => {
        console.log(sql);
    };
    return (
        <Button
            onClick={handleSqlRunner}
            design="Emphasized"
            className="float-end mb-2 mr-2"
            aria-label="Run SQL"
            tooltip="Run SQL"
        >
            <Play className="m-2 size-8 p-2" />
        </Button>
    );
};

export default SQLRunner;
