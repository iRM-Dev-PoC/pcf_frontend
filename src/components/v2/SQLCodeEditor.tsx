import dracula from "@/lib/dracula.json";
import Editor, { loader, useMonaco } from "@monaco-editor/react";
import { Card } from "@ui5/webcomponents-react";
import { debounce } from "lodash";
import * as monaco from "monaco-editor";
import {
    useCallback,
    useEffect,
    type Dispatch,
    type SetStateAction,
} from "react";

// Configuring the loader with the Monaco instance
loader.config({ monaco });

// Function to define the Dracula theme
const defineDraculaTheme = (monacoInstance: typeof monaco) => {
    monacoInstance.editor.defineTheme(
        "dracula",
        dracula as monaco.editor.IStandaloneThemeData
    );
};

// Function to load SQL language support
const loadSQLLanguage = async (monacoInstance: typeof monaco) => {
    try {
        await import("monaco-editor/esm/vs/basic-languages/sql/sql.js");
        if ("sql" in monacoInstance.languages) {
            (monacoInstance.languages as any).sql.sqlDefaults.setOptions({
                validate: false,
                format: false,
                suggest: {
                    snippetsPreventQuickSuggestions: false,
                },
            });
        }
    } catch (error) {
        console.error("Failed to load SQL language support:", error);
    }
};

const SQLCodeEditor = ({
    sql,
    setSql,
}: {
    sql: string;
    setSql: Dispatch<SetStateAction<string>>;
}) => {
    const monacoInstance = useMonaco();

    useEffect(() => {
        if (monacoInstance) {
            defineDraculaTheme(monacoInstance);
            loadSQLLanguage(monacoInstance);
        }
    }, [monacoInstance]);

    const handleEditorDidMount = (
        editor: monaco.editor.IStandaloneCodeEditor
    ) => {
        editor.updateOptions({
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            folding: false,
            glyphMargin: false,
            lineNumbers: "on",
            renderLineHighlight: "none",
            hideCursorInOverviewRuler: true,
            overviewRulerLanes: 0,
            renderWhitespace: "none",
            occurrencesHighlight: "off",
            matchBrackets: "never",
        });
    };

    const handleEditorChange = useCallback(
        debounce((value: string | undefined) => {
            setSql(value || "");
        }, 300),
        []
    );

    return (
        <Card>
            <Editor
                theme="dracula"
                className="m-2 rounded-md"
                language="sql"
                height="50vh"
                value={sql}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    folding: false,
                    glyphMargin: false,
                    lineNumbers: "on",
                }}
            />
        </Card>
    );
};

export default SQLCodeEditor;
