#![allow(dead_code)]

use http::StatusCode;
use vercel_lambda::{lambda, error::VercelError, IntoResponse, Request, Response};
use std::error::Error;

fn handler(_: Request) -> Result<impl IntoResponse, VercelError> {
    let response = Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(api_overview())
        .expect("Internal Server Error");

    Ok(response)
}

// Start the runtime with the handler
fn main() -> Result<(), Box<dyn Error>> {
    Ok(lambda!(handler))
}

fn api_overview() -> &'static str {
    r#"{"service":"arthur-kovacs-is","runtime":"vercel-rust","status":"ok","notes":["Personal site with activity pages and markdown posts.","URL shortener is currently backed by Thin Backend on the frontend.","Rust API is set up as an experimental backend entrypoint and health endpoint."]}"#
}

#[cfg(test)]
mod tests {
    use super::api_overview;

    #[test]
    fn overview_mentions_shortener_and_runtime() {
        let payload = api_overview();

        assert!(payload.contains("\"runtime\":\"vercel-rust\""));
        assert!(payload.contains("URL shortener"));
    }
}
