use serde_json::{json, Value};
use vercel_runtime::{run, service_fn, Error, Request};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let service = service_fn(handler);
    run(service).await
}

async fn handler(_req: Request) -> Result<Value, Error> {
    Ok(api_overview())
}

fn api_overview() -> Value {
    json!({
        "service": "arthur-kovacs-is",
        "runtime": "vercel-rust",
        "status": "ok",
        "notes": [
            "Personal site with activity pages and markdown posts.",
            "URL shortener is currently backed by Thin Backend on the frontend.",
            "Rust API now uses Vercel's official Rust runtime."
        ]
    })
}

#[cfg(test)]
mod tests {
    use super::api_overview;

    #[test]
    fn overview_mentions_shortener_and_runtime() {
        let payload = api_overview();

        assert_eq!(payload["runtime"], "vercel-rust");
        assert!(
            payload["notes"]
                .as_array()
                .expect("notes should be an array")
                .iter()
                .any(|note| note.as_str().unwrap_or_default().contains("URL shortener"))
        );
    }
}
